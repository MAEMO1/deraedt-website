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
import type { Profile, Job, JobApplication, ApplicationStatus } from '@/lib/supabase/types';
import {
  publishToVDAB,
  getVDABSyncStatus,
  validateForVDAB,
  type VDABSyncStatus,
  type InternalJob,
} from '@/lib/adapters/vdab';
import {
  ROLE_LABELS,
  JOB_STATUS_LABELS,
  JOB_STATUS_COLORS,
  APPLICATION_STATUS_LABELS,
  APPLICATION_STATUS_COLORS,
  EMPLOYMENT_TYPE_LABELS,
  getDisplayName,
} from '@/lib/dashboard';

interface RecruitmentClientProps {
  user: Profile;
  jobs: Job[];
  applications: JobApplication[];
}

interface CreateJobForm {
  title: string;
  department: string;
  location: string;
  description: string;
  employment_type: 'full_time' | 'part_time' | 'contract' | 'internship';
  requirements: string;
  benefits: string;
  status: 'draft' | 'published';
}

const initialJobForm: CreateJobForm = {
  title: '',
  department: '',
  location: '',
  description: '',
  employment_type: 'full_time',
  requirements: '',
  benefits: '',
  status: 'draft',
};

export function RecruitmentClient({ user, jobs: initialJobs, applications: initialApplications }: RecruitmentClientProps) {
  const [activeTab, setActiveTab] = useState<'jobs' | 'applications'>('jobs');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  const [applications, setApplications] = useState<JobApplication[]>(initialApplications);
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [retentionMonths, setRetentionMonths] = useState(12);
  const [vdabSyncStatuses, setVdabSyncStatuses] = useState<Map<string, VDABSyncStatus>>(new Map());
  const [publishingJobId, setPublishingJobId] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [jobForm, setJobForm] = useState<CreateJobForm>(initialJobForm);
  const [isCreatingJob, setIsCreatingJob] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const displayName = getDisplayName(user);

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

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return '-';
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

  const handleStatusChange = async (applicationId: string, newStatus: ApplicationStatus) => {
    // Optimistic update
    setApplications((prev) =>
      prev.map((app) =>
        app.id === applicationId ? { ...app, status: newStatus } : app
      )
    );

    try {
      const response = await fetch(`/api/applications/${applicationId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        console.error('[APPLICATION STATUS CHANGE] API error');
        // Could revert optimistic update here if needed
      } else {
        console.log('[APPLICATION STATUS CHANGE] Saved:', {
          application_id: applicationId,
          new_status: newStatus,
        });
      }
    } catch (error) {
      console.error('[APPLICATION STATUS CHANGE] Error:', error);
    }
  };

  const handleCreateJob = () => {
    setJobForm(initialJobForm);
    setCreateError(null);
    setShowCreateModal(true);
  };

  const handleSubmitJob = async () => {
    setIsCreatingJob(true);
    setCreateError(null);

    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: jobForm.title,
          department: jobForm.department,
          location: jobForm.location,
          description: jobForm.description,
          employment_type: jobForm.employment_type,
          requirements: jobForm.requirements.split('\n').filter(r => r.trim()),
          benefits: jobForm.benefits.split('\n').filter(b => b.trim()),
          status: jobForm.status,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Er is iets misgegaan');
      }

      // Add new job to list
      setJobs(prev => [result.job, ...prev]);
      setShowCreateModal(false);
      setJobForm(initialJobForm);
    } catch (error) {
      console.error('[CREATE JOB ERROR]', error);
      setCreateError(error instanceof Error ? error.message : 'Er is iets misgegaan');
    } finally {
      setIsCreatingJob(false);
    }
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
          userRole={ROLE_LABELS[user.role] || user.role}
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
                    ? Object.entries(JOB_STATUS_LABELS).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))
                    : Object.entries(APPLICATION_STATUS_LABELS).map(([value, label]) => (
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
                                {EMPLOYMENT_TYPE_LABELS[job.employment_type] || job.employment_type}
                              </span>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className={`text-xs px-2 py-1 rounded border ${JOB_STATUS_COLORS[job.status]}`}>
                              {JOB_STATUS_LABELS[job.status]}
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
                          <span className={`text-xs px-2 py-1 rounded border ${APPLICATION_STATUS_COLORS[app.status]}`}>
                            {APPLICATION_STATUS_LABELS[app.status]}
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
                  {(Object.entries(APPLICATION_STATUS_LABELS) as [ApplicationStatus, string][]).map(([value, label]) => (
                    <button
                      key={value}
                      onClick={() => handleStatusChange(selectedApplication.id, value)}
                      className={`px-3 py-1.5 text-xs rounded border transition-colors ${
                        selectedApplication.status === value
                          ? APPLICATION_STATUS_COLORS[value]
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

      {/* Create Job Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-[#0C0C0C]/10 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-xl font-display text-[#0C0C0C]">Nieuwe Vacature</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-[#0C0C0C]/5 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {createError && (
                <div className="bg-red-50 border border-red-200 p-4 rounded">
                  <p className="text-sm text-red-700">{createError}</p>
                </div>
              )}

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-[#0C0C0C] mb-1">
                  Titel <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={jobForm.title}
                  onChange={(e) => setJobForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="bijv. Werfleider"
                  className="w-full px-3 py-2 border border-[#0C0C0C]/10 focus:border-[#9A6B4C] focus:outline-none"
                />
              </div>

              {/* Department & Location */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#0C0C0C] mb-1">
                    Afdeling <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={jobForm.department}
                    onChange={(e) => setJobForm(prev => ({ ...prev, department: e.target.value }))}
                    placeholder="bijv. Bouw"
                    className="w-full px-3 py-2 border border-[#0C0C0C]/10 focus:border-[#9A6B4C] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0C0C0C] mb-1">
                    Locatie <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={jobForm.location}
                    onChange={(e) => setJobForm(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="bijv. Oost-Vlaanderen"
                    className="w-full px-3 py-2 border border-[#0C0C0C]/10 focus:border-[#9A6B4C] focus:outline-none"
                  />
                </div>
              </div>

              {/* Employment Type */}
              <div>
                <label className="block text-sm font-medium text-[#0C0C0C] mb-1">
                  Type
                </label>
                <select
                  value={jobForm.employment_type}
                  onChange={(e) => setJobForm(prev => ({ ...prev, employment_type: e.target.value as CreateJobForm['employment_type'] }))}
                  className="w-full px-3 py-2 border border-[#0C0C0C]/10 focus:border-[#9A6B4C] focus:outline-none bg-white"
                >
                  {Object.entries(EMPLOYMENT_TYPE_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-[#0C0C0C] mb-1">
                  Beschrijving <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={jobForm.description}
                  onChange={(e) => setJobForm(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  placeholder="Beschrijf de functie en verantwoordelijkheden..."
                  className="w-full px-3 py-2 border border-[#0C0C0C]/10 focus:border-[#9A6B4C] focus:outline-none resize-none"
                />
              </div>

              {/* Requirements */}
              <div>
                <label className="block text-sm font-medium text-[#0C0C0C] mb-1">
                  Vereisten <span className="text-xs text-[#6B6560]">(één per regel)</span>
                </label>
                <textarea
                  value={jobForm.requirements}
                  onChange={(e) => setJobForm(prev => ({ ...prev, requirements: e.target.value }))}
                  rows={4}
                  placeholder="Minimum 5 jaar ervaring&#10;Rijbewijs B&#10;VCA-attest"
                  className="w-full px-3 py-2 border border-[#0C0C0C]/10 focus:border-[#9A6B4C] focus:outline-none resize-none"
                />
              </div>

              {/* Benefits */}
              <div>
                <label className="block text-sm font-medium text-[#0C0C0C] mb-1">
                  Voordelen <span className="text-xs text-[#6B6560]">(één per regel)</span>
                </label>
                <textarea
                  value={jobForm.benefits}
                  onChange={(e) => setJobForm(prev => ({ ...prev, benefits: e.target.value }))}
                  rows={4}
                  placeholder="Competitief salaris&#10;Bedrijfswagen&#10;Maaltijdcheques"
                  className="w-full px-3 py-2 border border-[#0C0C0C]/10 focus:border-[#9A6B4C] focus:outline-none resize-none"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-[#0C0C0C] mb-1">
                  Status
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="draft"
                      checked={jobForm.status === 'draft'}
                      onChange={() => setJobForm(prev => ({ ...prev, status: 'draft' }))}
                      className="text-[#9A6B4C] focus:ring-[#9A6B4C]"
                    />
                    <span className="text-sm text-[#0C0C0C]">Concept</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="published"
                      checked={jobForm.status === 'published'}
                      onChange={() => setJobForm(prev => ({ ...prev, status: 'published' }))}
                      className="text-[#9A6B4C] focus:ring-[#9A6B4C]"
                    />
                    <span className="text-sm text-[#0C0C0C]">Direct publiceren</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-[#0C0C0C]/10 flex items-center justify-end gap-4">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-sm text-[#6B6560] hover:text-[#0C0C0C]"
              >
                Annuleren
              </button>
              <button
                onClick={handleSubmitJob}
                disabled={isCreatingJob || !jobForm.title || !jobForm.department || !jobForm.location || !jobForm.description}
                className="flex items-center gap-2 bg-[#0C0C0C] text-white px-4 py-2 text-sm font-medium hover:bg-[#9A6B4C] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCreatingJob ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Opslaan...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Vacature Aanmaken
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
