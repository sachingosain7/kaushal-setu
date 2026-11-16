'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  FileCheck2,
  Filter,
  Search,
  CheckCircle2,
  Calendar,
} from 'lucide-react';

const AUDIT_EVENTS = [
  {
    id: 'EVT-88219',
    timestamp: '2026-11-13 14:48:12 IST',
    official: 'Sachin Gosain (SSO / DIID)',
    action: 'COMPETENCY_AUTO_UPDATED',
    resource: 'STAT_SURVEY_DESIGN (L2 -> L3)',
    ip: '10.20.1.104 (NICNet)',
    status: 'VERIFIED',
    hash: 'sha256:7f4a...92b1',
  },
  {
    id: 'EVT-88218',
    timestamp: '2026-11-13 14:45:04 IST',
    official: 'Sachin Gosain (SSO / DIID)',
    action: 'ASSESSMENT_COMPLETED',
    resource: 'Survey Sampling & NSS Multi-Stage Design (Score: 80%)',
    ip: '10.20.1.104 (NICNet)',
    status: 'VERIFIED',
    hash: 'sha256:3a1b...88c4',
  },
  {
    id: 'EVT-88217',
    timestamp: '2026-11-13 14:32:45 IST',
    official: 'Ms. Ragini Kumari (Faculty / NSSTA)',
    action: 'QUIZ_PUBLISHED_TO_COHORT',
    resource: 'JSO Induction Batch 2026 (5 Questions)',
    ip: '10.20.4.112 (NSSTA Campus)',
    status: 'VERIFIED',
    hash: 'sha256:91c0...44da',
  },
  {
    id: 'EVT-88216',
    timestamp: '2026-11-13 14:10:19 IST',
    official: 'Sachin Gosain (SSO / DIID)',
    action: 'PARICHAY_SSO_LOGIN',
    resource: 'Session JWT Granted (Role: LEARNER)',
    ip: '10.20.1.104 (NICNet)',
    status: 'VERIFIED',
    hash: 'sha256:12e9...77b2',
  },
  {
    id: 'EVT-88215',
    timestamp: '2026-11-13 13:58:30 IST',
    official: 'System Service Account',
    action: 'IGOT_PASSBOOK_SYNC',
    resource: 'W3C Verifiable Credential vc_demo89127',
    ip: '164.100.24.12 (NIC Gateway)',
    status: 'VERIFIED',
    hash: 'sha256:55f2...31ac',
  },
];

export default function AuditLogPage() {
  const [filterAction, setFilterAction] = useState('ALL');

  const filtered = AUDIT_EVENTS.filter(
    (e) => filterAction === 'ALL' || e.action === filterAction
  );

  return (
    <AppShell currentRole="ADMIN">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-ink-200 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
              <span className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider">
                Statutory Compliance &amp; Integrity Log
              </span>
            </div>
            <h1 className="font-serif font-bold text-2xl text-ink-950 mt-1">
              Security &amp; Competency Audit Trail
            </h1>
            <p className="text-xs text-ink-600 mt-0.5">
              Tamper-evident system event records logged in compliance with the <strong>Digital Personal Data Protection (DPDP) Act 2023</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-md bg-paper-100 text-ink-700 text-xs font-mono border border-ink-200 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Immutable Ledger Verified</span>
            </span>
          </div>
        </div>

        {/* DPDP Act Compliance Declaration */}
        <div className="gov-card p-5 bg-paper-50 border-ink-200 space-y-2">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-chakra" />
            <span className="font-serif font-bold text-sm text-ink-950">
              Statutory Privacy &amp; Data Protection Notice
            </span>
          </div>
          <p className="text-xs text-ink-600 leading-relaxed">
            All competency scores, assessment attempts, and learning passbooks are confidential to the respective official and MoSPI administration. Data processing complies strictly with Section 7 (Legitimate Uses) of the DPDP Act 2023. No personnel evaluation data is retained or transmitted to third-party commercial LLM providers without institutional anonymization.
          </p>
        </div>

        {/* Audit Log Table */}
        <div className="gov-card bg-white overflow-hidden space-y-3 p-5">
          <div className="flex items-center justify-between pb-3 border-b border-ink-100">
            <div className="flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-ink-700" />
              <span className="font-mono font-bold text-xs text-ink-900 uppercase">
                System Event Logs ({filtered.length} Recorded)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={filterAction}
                onChange={(e) => setFilterAction(e.target.value)}
                className="px-2.5 py-1 text-xs rounded border border-ink-200 bg-paper-50 font-mono text-ink-900"
              >
                <option value="ALL">All Event Types</option>
                <option value="COMPETENCY_AUTO_UPDATED">Competency Updates</option>
                <option value="ASSESSMENT_COMPLETED">Assessments</option>
                <option value="QUIZ_PUBLISHED_TO_COHORT">Quiz Publishing</option>
                <option value="PARICHAY_SSO_LOGIN">Parichay Auth</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-paper-50 border-b border-ink-200 text-ink-700 uppercase font-bold">
                <tr>
                  <th className="p-3">Event ID</th>
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">Official / Entity</th>
                  <th className="p-3">Action</th>
                  <th className="p-3">Resource Affected</th>
                  <th className="p-3">Origin IP</th>
                  <th className="p-3 text-right">Integrity Hash</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {filtered.map((evt) => (
                  <tr key={evt.id} className="hover:bg-paper-50 transition-colors">
                    <td className="p-3 font-bold text-ink-900">{evt.id}</td>
                    <td className="p-3 text-ink-600 text-[11px]">{evt.timestamp}</td>
                    <td className="p-3 font-sans font-medium text-ink-950">{evt.official}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-paper-100 text-ink-800 border border-ink-200 text-[10px] font-bold">
                        {evt.action}
                      </span>
                    </td>
                    <td className="p-3 font-sans text-ink-700 max-w-xs truncate">{evt.resource}</td>
                    <td className="p-3 text-ink-500 text-[11px]">{evt.ip}</td>
                    <td className="p-3 text-right text-[10px] text-ink-400">{evt.hash}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
