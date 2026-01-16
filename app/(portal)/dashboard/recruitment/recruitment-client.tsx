'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Plus,
  Briefcase,
  MapPin,
  Clock,
  Users,
  Eye,
  Edit2,
  Trash2,
  Download,
  Mail,
  Phone,
  Calendar,
  X,
  Check,
  AlertTriangle,
  FileText,
  Send,
  RefreshCw,
  CheckCircle,
  XCircle,
  Loader2,
} from 'lucide-react';
import { Sidebar, DashboardHeader } from '@/components/portal';
import type { Profile } from '@/lib/supabase/types';
import {
  publishToVDAB,
  getVDABSyncStatus,
  validateForVDAB,
  type VDABSyncStatus,
  type InternalJob,
} from '@/lib/adapters/vdab';

// Import seed data for demo
import jobsData from '@/scripts/seed/jobs.json';

interface RecruitmentClientProps {
  user: Profile;
}

interface Job {
  id: string;
  title: string;
  slug: string;
  department: string;
  employment_type: string;
  location: string;
  description: string;
  requirements: string[];
  benefits: string[];
  status: string;
  created_at?: string;
}

interface Application {
  id: string;
  job_id: string;
  full_name: string;
  email: string;
  phone?: string;
  cv_url?: string;
  cover_letter?: string;
  status: string;
  created_at: string;
  retention_until: string;
}

const jobs: Job[] = jobsData as Job[];

// Mock applications data
const mockApplications: Application[] = [
  {
    id: 'app-001',
    job_id: 'job-001',
    full_name: 'Jan Peeters',
    email: 'jan.peeters@email.be',
    phone: '+32 478 12 34 56',
    cv_url: '/uploads/cv-jan-peeters.pdf',
    cover_letter: 'Geachte heer/mevrouw, met veel interesse heb ik uw vacature gelezen...',
    status: 'new',
    created_at: '2026-01-15T10:30:00Z',
    retention_until: '2027-01-15T10:30:00Z',
  },
  {
    id: 'app-002',
    job_id: 'job-001',
    full_name: 'Marie Janssens',
    email: 'marie.janssens@email.be',
    phone: '+32 479 23 45 67',
    cv_url: '/uploads/cv-marie-janssens.pdf',
    status: 'screening',
    created_at: '2026-01-14T14:20:00Z',
    retention_until: '2027-01-14T14:20:00Z',
  },
  {
    id: 'app-003',
    job_id: 'job-002',
    full_name: 'Thomas De Smet',
    email: 'thomas.desmet@email.be',
    phone: '+32 477 34 56 78',
    cv_url: '/uploads/cv-thomas-desmet.pdf',
    cover_letter: 'Als ervaren dakwerker ben ik zeer geïnteresseerd in deze positie...',
    status: 'interview',
    created_at: '2026-01-10T09:15:00Z',
    retention_until: '2027-01-10T09:15:00Z',
  },
  {
    id: 'app-004',
    job_id: 'job-003',
    full_name: 'Sophie Vermeersch',
    email: 'sophie.vermeersch@email.be',
    status: 'offer',
    created_at: '2026-01-05T11:45:00Z',
    retention_until: '2027-01-05T11:45:00Z',
  },
];

const roleLabels: Record<string, string> = {
  DIRECTIE: 'Directie',
  SALES: 'Sales',
  HR: 'HR',
  OPERATIONS: 'Operations',
  ADMIN: 'Administrator',
  VIEWER: 'Viewer',
};

const jobStatusLabels: Record<string, string> = {
  draft: 'Concept',
  published: 'Gepubliceerd',
  closed: 'Gesloten',
};

const jobStatusColors: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-700 border-gray-200',
  published: 'bg-green-100 text-green-700 border-green-200',
  closed: 'bg-red-100 text-red-700 border-red-200',
};

const applicationStatusLabels: Record<string, string> = {
  new: 'Nieuw',
  screening: 'Screening',
  interview: 'Interview',
  offer: 'Aanbod',
  hired: 'Aangenomen',
  rejected: 'Afgewezen',
};

const applicationStatusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700 border-blue-200',
  screening: 'bg-amber-100 text-amber-700 border-amber-200',
  interview: 'bg-purple-100 text-purple-700 border-purple-200',
  offer: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  hired: 'bg-green-100 text-green-700 border-green-200',
  rejected: 'bg-red-100 text-red-700 border-red-200',
};

const employmentTypeLabels: Record<string, string> = {
  full_time: 'Voltijds',
  part_time: 'Deeltijds',
  contract: 'Contract',
  internship: 'Stage',
};

export function RecruitmentClient({ user }: RecruitmentClientProps) {
  const [activeTab, setActiveTab] = useState<'jobs' | 'applications'>('jobs');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [retentionMonths, setRetentionMonths] = useState(12);
  const [vdabSyncStatuses, setVdabSyncStatuses] = useState<Map<string, VDABSyncStatus>>(new Map());
  const [publishingJobId, setPublishingJobId] = useState<string | null>(null);

  const displayName = user.full_name || user.email.split('@')[0];

  // Filter jobs
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      searchQuery === '' ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || job.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Filter applications
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      searchQuery === '' ||
      app.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('nl-BE', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('nl-BE', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getJobTitle = (jobId: string) => {
    const job = jobs.find((j) => j.id === jobId);
    return job?.title || 'Onbekende vacature';
  };

  const handleStatusChange = (applicationId: string, newStatus: string) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === applicationId ? { ...app, status: newStatus } : app
      )
    );

    console.log('[APPLICATION STATUS CHANGE]', {
      application_id: applicationId,
      new_status: newStatus,
      user: user.email,
      timestamp: new Date().toISOString(),
    });
  };

  const handleCreateJob = () => {
    console.log('[CREATE JOB]', {
      user: user.email,
      timestamp: new Date().toISOString(),
    });
    alert('Vacature aanmaken functionaliteit. In productie opent dit een formulier.');
  };

  const handleEditJob = (jobId: string) => {
    console.log('[EDIT JOB]', {
      job_id: jobId,
      user: user.email,
      timestamp: new Date().toISOString(),
    });
    alert(`Vacature bewerken: ${jobId}. In productie opent dit een formulier.`);
  };

  const handleDeleteJob = (jobId: string) => {
    console.log('[DELETE JOB]', {
      job_id: jobId,
      user: user.email,
      timestamp: new Date().toISOString(),
    });
    alert(`Vacature verwijderen: ${jobId}. In productie wordt dit bevestigd.`);
  };

  const handleRetentionChange = (months: number) => {
    setRetentionMonths(months);
    console.log('[RETENTION POLICY CHANGE]', {
      months,
      user: user.email,
      timestamp: new Date().toISOString(),
    });
  };

  const handlePublishToVDAB = async (job: Job) => {
    // Validate job
    const validation = validateForVDAB(job as InternalJob);
    if (!validation.valid) {
      alert(`Kan niet publiceren naar VDAB:\n\n${validation.errors.join('\n')}`);
      return;
    }

    setPublishingJobId(job.id);

    try {
      const result = await publishToVDAB(job as InternalJob);

      if (result.success) {
        // Update sync status
        setVdabSyncStatuses((prev) => {
          const next = new Map(prev);
          next.set(job.id, getVDABSyncStatus(job.id));
          return next;
        });

        alert(`Vacature gepubliceerd naar VDAB!\n\nVDAB ID: ${result.vdabId}\n\n(Dit is een stub - in productie wordt de vacature daadwerkelijk gepubliceerd)`);
      } else {
        alert(`Fout bij publiceren naar VDAB:\n\n${result.message}`);
      }
    } catch (error) {
      console.error('[VDAB PUBLISH ERROR]', error);
      alert('Er is een fout opgetreden bij het publiceren naar VDAB.');
    } finally {
      setPublishingJobId(null);
    }
  };

  const getVdabStatusForJob = (jobId: string): VDABSyncStatus => {
    return vdabSyncStatuses.get(jobId) || { jobId, status: 'not_synced' };
  };

  // Stats
  const totalJobs = jobs.length;
  const publishedJobs = jobs.filter((j) => j.status === 'published').length;
  const totalApplications = applications.length;
  const newApplications = applications.filter((a) => a.status === 'new').length;

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Sidebar />

      <div className="ml-64">
        <DashboardHeader
          title="Recruitment Hub"
          userName={displayName}
          userRole={roleLabels[user.role] || user.role}
        />

        <main className="p-6">
          {/* Stats */}
          <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white p-4 border border-[#0C0C0C]/5">
              <p className="text-xs text-[#6B6560]">Totaal Vacatures</p>
              <p className="text-2xl font-bold text-[#0C0C0C]">{totalJobs}</p>
            </div>
            <div className="bg-white p-4 border border-[#0C0C0C]/5">
              <p className="text-xs text-[#6B6560]">Gepubliceerd</p>
              <p className="text-2xl font-bold text-green-600">{publishedJobs}</p>
            </div>
            <div className="bg-white p-4 border border-[#0C0C0C]/5">
              <p className="text-xs text-[#6B6560]">Sollicitaties</p>
              <p className="text-2xl font-bold text-[#0C0C0C]">{totalApplications}</p>
            </div>
            <div className="bg-white p-4 border border-[#0C0C0C]/5">
              <p className="text-xs text-[#6B6560]">Nieuw</p>
              <p className="text-2xl font-bold text-blue-600">{newApplications}</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-6 flex items-center gap-4 border-b border-[#0C0C0C]/10">
            <button
              onClick={() => {
                setActiveTab('jobs');
                setFilterStatus('all');
                setSearchQuery('');
              }}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'jobs'
                  ? 'border-[#9A6B4C] text-[#9A6B4C]'
                  : 'border-transparent text-[#6B6560] hover:text-[#0C0C0C]'
              }`}
            >
              <Briefcase className="w-4 h-4 inline mr-2" />
              Vacatures ({totalJobs})
            </button>
            <button
              onClick={() => {
                setActiveTab('applications');
                setFilterStatus('all');
                setSearchQuery('');
              }}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'applications'
                  ? 'border-[#9A6B4C] text-[#9A6B4C]'
                  : 'border-transparent text-[#6B6560] hover:text-[#0C0C0C]'
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              Sollicitaties ({totalApplications})
              {newApplications > 0 && (
                <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full">
                  {newApplications}
                </span>
              )}
            </button>
          </div>

          {/* Header Actions */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6560]" />
                <input
                  type="text"
                  placeholder="Zoeken..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 border border-[#0C0C0C]/10 focus:border-[#9A6B4C] focus:outline-none"
                />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6560]" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-[#0C0C0C]/10 focus:border-[#9A6B4C] focus:outline-none appearance-none bg-white"
                >
                  <option value="all">Alle statussen</option>
                  {activeTab === 'jobs'
                    ? Object.entries(jobStatusLabels).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))
                    : Object.entries(applicationStatusLabels).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                </select>
              </div>
            </div>

            {activeTab === 'jobs' && (
              <button
                onClick={handleCreateJob}
                className="flex items-center gap-2 bg-[#0C0C0C] text-white px-4 py-2 text-sm font-medium hover:bg-[#9A6B4C]"
              >
                <Plus className="w-4 h-4" />
                Nieuwe Vacature
              </button>
            )}
          </div>

          {/* Jobs List */}
          {activeTab === 'jobs' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-[#0C0C0C]/5"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#0C0C0C]/5 text-left">
                      <th className="p-4 text-xs font-semibold text-[#6B6560] uppercase">Vacature</th>
                      <th className="p-4 text-xs font-semibold text-[#6B6560] uppercase">Afdeling</th>
                      <th className="p-4 text-xs font-semibold text-[#6B6560] uppercase">Locatie</th>
                      <th className="p-4 text-xs font-semibold text-[#6B6560] uppercase">Type</th>
                      <th className="p-4 text-xs font-semibold text-[#6B6560] uppercase">Status</th>
                      <th className="p-4 text-xs font-semibold text-[#6B6560] uppercase">VDAB</th>
                      <th className="p-4 text-xs font-semibold text-[#6B6560] uppercase">Sollicitaties</th>
                      <th className="p-4 text-xs font-semibold text-[#6B6560] uppercase"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredJobs.map((job) => {
                      const jobApplications = applications.filter((a) => a.job_id === job.id);
                      return (
                        <tr
                          key={job.id}
                          className="border-b border-[#0C0C0C]/5 hover:bg-[#FAF7F2]"
                        >
                          <td className="p-4">
                            <p className="font-medium text-[#0C0C0C]">{job.title}</p>
                            <p className="text-xs text-[#6B6560] truncate max-w-xs">{job.description}</p>
                          </td>
                          <td className="p-4">
                            <span className="text-sm text-[#0C0C0C]">{job.department}</span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-[#6B6560]" />
                              <span className="text-sm text-[#0C0C0C]">{job.location}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-[#6B6560]" />
                              <span className="text-sm text-[#0C0C0C]">
                                {employmentTypeLabels[job.employment_type] || job.employment_type}
                              </span>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className={`text-xs px-2 py-1 rounded border ${jobStatusColors[job.status]}`}>
                              {jobStatusLabels[job.status]}
                            </span>
                          </td>
                          <td className="p-4">
                            {(() => {
                              const vdabStatus = getVdabStatusForJob(job.id);
                              const isPublishing = publishingJobId === job.id;

                              if (isPublishing) {
                                return (
                                  <span className="flex items-center gap-1 text-xs text-amber-600">
                                    <Loader2 className="w-3 h-3 animate-spin" />
                                    Publiceren...
                                  </span>
                                );
                              }

                              if (vdabStatus.status === 'synced') {
                                return (
                                  <div className="flex items-center gap-2">
                                    <span className="flex items-center gap-1 text-xs text-green-600">
                                      <CheckCircle className="w-3 h-3" />
                                      Gesynchroniseerd
                                    </span>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handlePublishToVDAB(job);
                                      }}
                                      className="p-1 hover:bg-[#0C0C0C]/5 rounded"
                                      title="Opnieuw synchroniseren"
                                    >
                                      <RefreshCw className="w-3 h-3 text-[#6B6560]" />
                                    </button>
                                  </div>
                                );
                              }

                              if (vdabStatus.status === 'error') {
                                return (
                                  <span className="flex items-center gap-1 text-xs text-red-600">
                                    <XCircle className="w-3 h-3" />
                                    Fout
                                  </span>
                                );
                              }

                              // not_synced
                              return (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handlePublishToVDAB(job);
                                  }}
                                  disabled={job.status !== 'published'}
                                  className="flex items-center gap-1 text-xs text-[#9A6B4C] hover:underline disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline"
                                  title={job.status !== 'published' ? 'Vacature moet gepubliceerd zijn' : 'Publiceer naar VDAB'}
                                >
                                  <Send className="w-3 h-3" />
                                  Naar VDAB
                                </button>
                              );
                            })()}
                          </td>
                          <td className="p-4">
                            <span className="text-sm text-[#0C0C0C]">{jobApplications.length}</span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => window.open(`/werken-bij/${job.slug}`, '_blank')}
                                className="p-1 hover:bg-[#0C0C0C]/5 rounded"
                                title="Bekijken"
                              >
                                <Eye className="w-4 h-4 text-[#6B6560]" />
                              </button>
                              <button
                                onClick={() => handleEditJob(job.id)}
                                className="p-1 hover:bg-[#0C0C0C]/5 rounded"
                                title="Bewerken"
                              >
                                <Edit2 className="w-4 h-4 text-[#6B6560]" />
                              </button>
                              <button
                                onClick={() => handleDeleteJob(job.id)}
                                className="p-1 hover:bg-[#0C0C0C]/5 rounded"
                                title="Verwijderen"
                              >
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {filteredJobs.length === 0 && (
                <div className="p-12 text-center">
                  <Briefcase className="w-12 h-12 text-[#6B6560]/30 mx-auto mb-4" />
                  <p className="text-[#6B6560]">Geen vacatures gevonden</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Applications List */}
          {activeTab === 'applications' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-[#0C0C0C]/5"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#0C0C0C]/5 text-left">
                      <th className="p-4 text-xs font-semibold text-[#6B6560] uppercase">Kandidaat</th>
                      <th className="p-4 text-xs font-semibold text-[#6B6560] uppercase">Vacature</th>
                      <th className="p-4 text-xs font-semibold text-[#6B6560] uppercase">Datum</th>
                      <th className="p-4 text-xs font-semibold text-[#6B6560] uppercase">Status</th>
                      <th className="p-4 text-xs font-semibold text-[#6B6560] uppercase">Retentie</th>
                      <th className="p-4 text-xs font-semibold text-[#6B6560] uppercase"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApplications.map((app) => (
                      <tr
                        key={app.id}
                        className="border-b border-[#0C0C0C]/5 hover:bg-[#FAF7F2] cursor-pointer"
                        onClick={() => setSelectedApplication(app)}
                      >
                        <td className="p-4">
                          <p className="font-medium text-[#0C0C0C]">{app.full_name}</p>
                          <p className="text-xs text-[#6B6560]">{app.email}</p>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-[#0C0C0C]">{getJobTitle(app.job_id)}</span>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-[#6B6560]">{formatDate(app.created_at)}</span>
                        </td>
                        <td className="p-4">
                          <span className={`text-xs px-2 py-1 rounded border ${applicationStatusColors[app.status]}`}>
                            {applicationStatusLabels[app.status]}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="text-xs text-[#6B6560]">
                            Tot {formatDate(app.retention_until)}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {app.cv_url && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  console.log('[DOWNLOAD CV]', app.id);
                                }}
                                className="p-1 hover:bg-[#0C0C0C]/5 rounded"
                                title="CV downloaden"
                              >
                                <Download className="w-4 h-4 text-[#6B6560]" />
                              </button>
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedApplication(app);
                              }}
                              className="p-1 hover:bg-[#0C0C0C]/5 rounded"
                              title="Details"
                            >
                              <Eye className="w-4 h-4 text-[#6B6560]" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredApplications.length === 0 && (
                <div className="p-12 text-center">
                  <Users className="w-12 h-12 text-[#6B6560]/30 mx-auto mb-4" />
                  <p className="text-[#6B6560]">Geen sollicitaties gevonden</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Retention Policy Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 bg-[#9A6B4C]/10 border border-[#9A6B4C]/20 p-6"
          >
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-[#9A6B4C] flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-display text-lg text-[#0C0C0C] mb-2">GDPR Retentiebeleid</h3>
                <p className="text-sm text-[#6B6560] mb-4">
                  Sollicitatiegegevens worden automatisch verwijderd na de ingestelde periode (conform GDPR).
                  Kandidaten worden hierover geïnformeerd bij hun sollicitatie.
                </p>
                <div className="flex items-center gap-4">
                  <label className="text-sm text-[#0C0C0C]">Bewaartermijn:</label>
                  <select
                    value={retentionMonths}
                    onChange={(e) => handleRetentionChange(Number(e.target.value))}
                    className="px-3 py-2 border border-[#0C0C0C]/10 focus:border-[#9A6B4C] focus:outline-none bg-white text-sm"
                  >
                    <option value={6}>6 maanden</option>
                    <option value={12}>12 maanden (standaard)</option>
                    <option value={24}>24 maanden</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>

      {/* Application Detail Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-[#0C0C0C]/10 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-xl font-display text-[#0C0C0C]">Sollicitatie Details</h2>
              <button
                onClick={() => setSelectedApplication(null)}
                className="p-2 hover:bg-[#0C0C0C]/5 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Candidate Info */}
              <div>
                <h3 className="text-lg font-semibold text-[#0C0C0C] mb-4">{selectedApplication.full_name}</h3>
                <div className="space-y-2">
                  <p className="flex items-center gap-2 text-sm text-[#6B6560]">
                    <Mail className="w-4 h-4" />
                    <a href={`mailto:${selectedApplication.email}`} className="text-[#9A6B4C] hover:underline">
                      {selectedApplication.email}
                    </a>
                  </p>
                  {selectedApplication.phone && (
                    <p className="flex items-center gap-2 text-sm text-[#6B6560]">
                      <Phone className="w-4 h-4" />
                      <a href={`tel:${selectedApplication.phone}`} className="text-[#9A6B4C] hover:underline">
                        {selectedApplication.phone}
                      </a>
                    </p>
                  )}
                  <p className="flex items-center gap-2 text-sm text-[#6B6560]">
                    <Briefcase className="w-4 h-4" />
                    {getJobTitle(selectedApplication.job_id)}
                  </p>
                  <p className="flex items-center gap-2 text-sm text-[#6B6560]">
                    <Calendar className="w-4 h-4" />
                    Gesolliciteerd op {formatDateTime(selectedApplication.created_at)}
                  </p>
                </div>
              </div>

              {/* CV */}
              {selectedApplication.cv_url && (
                <div>
                  <h4 className="text-sm font-semibold text-[#0C0C0C] mb-2">CV</h4>
                  <button
                    onClick={() => console.log('[DOWNLOAD CV]', selectedApplication.id)}
                    className="flex items-center gap-2 px-4 py-2 border border-[#0C0C0C]/10 hover:bg-[#FAF7F2] text-sm"
                  >
                    <FileText className="w-4 h-4" />
                    CV downloaden
                    <Download className="w-4 h-4 ml-2" />
                  </button>
                </div>
              )}

              {/* Cover Letter */}
              {selectedApplication.cover_letter && (
                <div>
                  <h4 className="text-sm font-semibold text-[#0C0C0C] mb-2">Motivatie</h4>
                  <p className="text-sm text-[#6B6560] bg-[#FAF7F2] p-4 rounded">
                    {selectedApplication.cover_letter}
                  </p>
                </div>
              )}

              {/* Status Change */}
              <div>
                <h4 className="text-sm font-semibold text-[#0C0C0C] mb-2">Status</h4>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(applicationStatusLabels).map(([value, label]) => (
                    <button
                      key={value}
                      onClick={() => handleStatusChange(selectedApplication.id, value)}
                      className={`px-3 py-1.5 text-xs rounded border transition-colors ${
                        selectedApplication.status === value
                          ? applicationStatusColors[value]
                          : 'border-[#0C0C0C]/10 hover:bg-[#FAF7F2]'
                      }`}
                    >
                      {selectedApplication.status === value && <Check className="w-3 h-3 inline mr-1" />}
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Retention Info */}
              <div className="bg-amber-50 border border-amber-200 p-4 rounded">
                <p className="text-sm text-amber-700 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Gegevens worden automatisch verwijderd op {formatDate(selectedApplication.retention_until)}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
