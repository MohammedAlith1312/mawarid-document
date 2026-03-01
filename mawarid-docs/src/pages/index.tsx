import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const PROJECTS = [
  { label: 'Help Desk', to: '/docs/help-desk/intro', desc: 'Internal ticketing system' },
  { label: 'Customer Support', to: '/docs/customer-support/intro', desc: 'Customer case management' },
  { label: 'Self Service', to: '/docs/self-service/intro', desc: 'HR employee requests', completed: true },
  { label: 'Recruitment', to: '/docs/recruitment/intro', desc: 'Recruitment & onboarding', completed: true },
  { label: 'Internal Portal', to: '/docs/internal-portal/intro', desc: 'Internal employee portal', completed: true },
  { label: 'Mawarid Consulting', to: '/docs/mawarid-consulting/intro', desc: 'Consulting management', completed: true },
  { label: 'Coordinator', to: '/docs/coordinator/intro', desc: 'Coordinator portal & timesheets', completed: true },
  { label: 'E-Invoice', to: '/docs/e-invoice/intro', desc: 'ZATCA-compliant e-invoicing' },
  { label: 'Airport', to: '/docs/airport/intro', desc: 'Airport arrival tracking', completed: true },
  { label: 'Document Management', to: '/docs/document-management/intro', desc: 'Digital document signing' },
  { label: 'Maintenance', to: '/docs/maintenance/intro', desc: 'Work orders & asset tracking', completed: true },
  { label: 'SDR', to: '/docs/sdr/intro', desc: 'Software Development Requests', completed: true },
  { label: 'Cafe4x', to: '/docs/cafe4x/intro', desc: 'Cafeteria management', completed: true },
  { label: 'CAS', to: '/docs/cas/intro', desc: 'Candidate Acceptance System' },
  { label: 'Agent Portal', to: '/docs/agent-portal/intro', desc: 'Recruitment agent portal', completed: true },
  { label: 'Agent Contract', to: '/docs/agent-contract/intro', desc: 'Contract digital signing' },
  { label: 'Survey', to: '/docs/survey/intro', desc: 'Branch QA survey forms' },
  { label: 'Employee Portal', to: '/docs/employee-portal/intro', desc: 'Employee self-service app', completed: true },
];

export default function Home(): ReactNode {
  return (
    <Layout title="Mawarid Documentation" description="Official documentation for all Mawarid portal applications">
      {/* ── Hero ── */}
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <img
            src="https://portal.mawarid.com.sa/System/assets/images/mawarid-logo-2.png"
            alt="Mawarid Logo"
            className={styles.heroLogo}
          />
          <h1 className={styles.heroTitle}>Mawarid Documentation</h1>
          <p className={styles.heroSubtitle}>
            Official technical documentation for all <strong>Mawarid portal applications</strong>.<br />
            Explore page-by-page guides, API references, and integration details for every project.
          </p>
          <Link className={styles.heroBtn} to="/docs/intro">
            Browse All Projects →
          </Link>
        </div>
      </header>

      {/* ── About ── */}
      <section className={styles.about}>
        <div className={styles.aboutInner}>
          <h2>About Mawarid</h2>
          <p>
            <strong>Mawarid Human Resources Co.</strong> is a leading manpower and HR services company in Saudi Arabia.
            The Mawarid portal suite provides integrated digital solutions covering employee self-service,
            recruitment, customer support, consulting management, maintenance, finance, and more — all connected
            to ERP and CRM systems for seamless data flow.
          </p>
        </div>
      </section>

      {/* ── Project Cards ── */}
      <section className={styles.projects}>
        <div className="container">
          <h2 className={styles.projectsTitle}>Projects</h2>
          <div className={styles.grid}>
            {PROJECTS.map((p) => (
              <Link
                key={p.label}
                to={p.to}
                className={`${styles.card}${p.completed ? ' ' + styles.cardCompleted : ''}`}
              >
                <div className={styles.cardHeader}>
                  <span className={styles.cardLabel}>{p.label}</span>
                  {p.completed && (
                    <span className={styles.completedBadge}>✓</span>
                  )}
                </div>
                <span className={styles.cardDesc}>{p.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}