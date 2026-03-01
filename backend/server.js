const express = require("express");
const cors = require("cors");
const { App, Octokit } = require("octokit");
const dotenv = require("dotenv");
const path = require("path");

// If using Node <18
const fetch = require("node-fetch");

dotenv.config();
const app = express();

/* -------------------- CORS CONFIG -------------------- */
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "http://localhost:3000")
    .split(",")
    .map(o => o.trim());

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`CORS blocked: ${origin}`));
        }
    }
}));

app.use(express.json());

// const basePath = '/mawarid-docs-api';
const basePath = '';

app.post([basePath + '/oauth/token', '(.*)/oauth/token'], async (req, res) => {
    const { code } = req.body;

    if (!code) {
        return res.status(400).json({ error: "Missing code parameter" });
    }

    const clientId = process.env.GITHUB_CLIENT_ID || process.env.GITHUB_APP_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET || process.env.GITHUB_APP_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        console.error("Server misconfiguration: Missing GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET in .env");
        return res.status(500).json({ error: "Configuration Error", error_description: "Server is missing OAuth credentials." });
    }

    try {
        const response = await fetch(
            "https://github.com/login/oauth/access_token",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    client_id: clientId,
                    client_secret: clientSecret,
                    code,
                }),
            }
        );

        const data = await response.json();

        if (data.error) {
            console.error("GitHub OAuth error:", data.error_description);
            return res.status(400).json(data);
        }
        let username = null;
        const owner = process.env.GITHUB_OWNER;
        const repo = process.env.GITHUB_REPO;

        if (data.access_token) {
            try {
                // 1. Get the authenticated user's profile
                const userResponse = await fetch("https://api.github.com/user", {
                    headers: {
                        Authorization: `Bearer ${data.access_token}`,
                        Accept: "application/vnd.github.v3+json",
                        "User-Agent": "Mawarid-Auth-App"
                    }
                });

                if (!userResponse.ok) {
                    throw new Error(`Failed to fetch user profile: ${userResponse.statusText}`);
                }

                const userData = await userResponse.json();
                username = userData.login;

                // 2. Verify repository access using GitHub App token
                if (owner && repo) {
                    const octokit = await getOctokit(owner);

                    try {
                        const { data: permissionData } = await octokit.rest.repos.getCollaboratorPermissionLevel({
                            owner,
                            repo,
                            username
                        });

                        console.log(`User ${username} permission level on ${owner}/${repo}: ${permissionData.permission}`);

                        // We only allow users with read, write, or admin permissions
                        if (!['read', 'write', 'admin'].includes(permissionData.permission)) {
                            throw new Error(`Insufficient permissions: ${permissionData.permission}`);
                        }

                        // Success: user is a collaborator
                    } catch (collabError) {
                        console.error(`User ${username} does not have access to ${owner}/${repo}. GitHub API Error:`, collabError.message);
                        if (collabError.status === 404) {
                            console.error(`404 error usually means the GitHub App does NOT have permission to view members of ${owner}/${repo} or the user doesn't exist.`);
                        }

                        return res.status(403).json({
                            error: "Access Denied",
                            error_description: "You do not have access to the required GitHub repository."
                        });
                    }
                }
            } catch (verifyError) {
                console.error("Error verifying user repository access:", verifyError);
                return res.status(500).json({
                    error: "Internal Error",
                    error_description: "Internal error verifying repository access. Details: " + (verifyError.message || verifyError.toString()),
                    stack: verifyError.stack
                });
            }
        }

        res.json({
            ...data,
            username,
            repo_name: repo
        });
    } catch (err) {
        console.error("OAuth proxy error:", err);
        res.status(500).json({ error: "Internal proxy error" });
    }
});

app.get([basePath + '/health', '(.*)/health'], (req, res) => res.json({ status: 'ok' }));

/* -------------------- GITHUB APP AUTH -------------------- */
async function getOctokit(owner) {
    const appId = process.env.GITHUB_APP_ID;
    const privateKey = process.env.GITHUB_APP_PRIVATE_KEY;

    if (!appId || !privateKey) {
        throw new Error("Missing GitHub credentials (APP_ID or PRIVATE_KEY)");
    }

    try {
        const normalizedKey = privateKey.replace(/\\n/g, "\n").trim();

        const githubApp = new App({
            appId: parseInt(appId, 10),
            privateKey: normalizedKey,
        });

        const { data: installations } =
            await githubApp.octokit.rest.apps.listInstallations();

        let targetInstallId;

        if (owner) {
            const match = installations.find(i => i.account?.login === owner);
            if (match) targetInstallId = match.id;
        }

        if (!targetInstallId && installations.length > 0) {
            targetInstallId = installations[0].id;
        }

        if (!targetInstallId) {
            throw new Error("No installation found for GitHub App");
        }

        return await githubApp.getInstallationOctokit(targetInstallId);
    } catch (e) {
        console.error("GitHub Auth Error:", e.message);
        throw e;
    }
}

/* -------------------- 1. LIST ISSUES -------------------- */
app.get([basePath + '/api/issues/list', '(.*)/api/issues/list'], async (req, res) => {
    try {
        const owner = process.env.GITHUB_OWNER;
        const repo = process.env.GITHUB_REPO;

        const octokit = await getOctokit(owner);

        console.log(`Fetching issues for ${owner}/${repo}`);

        const data = await octokit.paginate(
            "GET /repos/{owner}/{repo}/issues",
            {
                owner,
                repo,
                state: "all",
                per_page: 100
            }
        );

        const issues = data
            .filter(i => !i.pull_request)
            .map(issue => {
                const body = issue.body || "";
                let extractedText = "";

                // extract selected text
                const contextMatch = body.match(
                    /\*\*(?:Selected Context|Selected Text|Selected Image):\*\*\n(>\s*|)(.*)/i
                );

                if (contextMatch) {
                    extractedText = contextMatch[2].trim();
                }

                // extract page URL
                const urlMatch = body.match(
                    /(?:\*\*URL:\*\*|URL:)[\s\r\n]*(http[^\s]+)/i
                );
                const pageUrl = urlMatch ? urlMatch[1].trim() : "";

                return {
                    id: `issue-${issue.id}`,
                    issueNumber: issue.number,
                    title: issue.title,
                    body,
                    url: issue.html_url,
                    pageUrl,
                    selectedText: extractedText || "No direct text reference",
                    state: (issue.state || "open").toLowerCase()
                };
            });

        res.json({ issues });
    } catch (error) {
        console.error("List error:", error);
        res.status(500).json({ error: error.message || "Failed to list issues" });
    }
});

/* -------------------- 2. CREATE ISSUE -------------------- */
app.post([basePath + '/api/issues/create', '(.*)/api/issues/create'], async (req, res) => {
    try {
        const { title, body } = req.body;
        const authHeader = req.headers.authorization;
        const userToken = authHeader ? authHeader.split(' ')[1] : null;

        if (!title) return res.status(400).json({ error: "Title required" });

        const owner = process.env.GITHUB_OWNER;
        const repo = process.env.GITHUB_REPO;

        let octokit;
        if (userToken && userToken !== 'null' && userToken !== '') {
            octokit = new Octokit({ auth: userToken });
            console.log("Using User Token for issue creation.");
        } else {
            octokit = await getOctokit(owner);
            console.log("Using GitHub App token for issue creation (no user token).");
        }

        const response = await octokit.rest.issues.create({
            owner,
            repo,
            title,
            body
        });

        res.json({
            success: true,
            url: response.data.html_url,
            number: response.data.number
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/* -------------------- 3. COMMENT ISSUE -------------------- */
app.post([basePath + '/api/issues/comment', '(.*)/api/issues/comment'], async (req, res) => {
    try {
        const { number, comment } = req.body;
        const authHeader = req.headers.authorization;
        const userToken = authHeader ? authHeader.split(' ')[1] : null;

        const owner = process.env.GITHUB_OWNER;
        const repo = process.env.GITHUB_REPO;

        let octokit;
        if (userToken && userToken !== 'null' && userToken !== '') {
            octokit = new Octokit({ auth: userToken });
        } else {
            octokit = await getOctokit(owner);
        }

        const response = await octokit.rest.issues.createComment({
            owner,
            repo,
            issue_number: number,
            body: comment
        });

        res.json({ success: true, data: response.data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/* -------------------- 4. CLOSE ISSUE -------------------- */
app.post([basePath + '/api/issues/close', '(.*)/api/issues/close'], async (req, res) => {
    try {
        const { number } = req.body;
        const authHeader = req.headers.authorization;
        const userToken = authHeader ? authHeader.split(' ')[1] : null;

        const owner = process.env.GITHUB_OWNER;
        const repo = process.env.GITHUB_REPO;

        let octokit;
        if (userToken && userToken !== 'null' && userToken !== '') {
            octokit = new Octokit({ auth: userToken });
        } else {
            octokit = await getOctokit(owner);
        }

        await octokit.rest.issues.update({
            owner,
            repo,
            issue_number: number,
            state: "closed"
        });

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/* -------------------- 5. UPDATE ISSUE -------------------- */
app.post([basePath + '/api/issues/update', '(.*)/api/issues/update'], async (req, res) => {
    try {
        const { number, title, body } = req.body;
        const authHeader = req.headers.authorization;
        const userToken = authHeader ? authHeader.split(' ')[1] : null;

        const owner = process.env.GITHUB_OWNER;
        const repo = process.env.GITHUB_REPO;

        let octokit;
        if (userToken && userToken !== 'null' && userToken !== '') {
            octokit = new Octokit({ auth: userToken });
        } else {
            octokit = await getOctokit(owner);
        }

        const response = await octokit.rest.issues.update({
            owner,
            repo,
            issue_number: number,
            title,
            body
        });

        res.json({ success: true, data: response.data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/* -------------------- SERVER START -------------------- */
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`OAuth proxy running → http://localhost:${PORT}`);
    console.log(`Allowed origins: ${allowedOrigins.join(", ")}`);
});