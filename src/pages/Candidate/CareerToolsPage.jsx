import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  FileText,
  MessageSquare,
  Copy,
  Check,
  Printer,
  ArrowRight,
  ShieldCheck,
  Award,
  Lightbulb,
  Briefcase,
  Clock,
  RotateCcw,
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { useAuth } from '../../hooks/useAuth';
import { generateGapReframing } from '../../services/aiService';
import { CAREER_BREAK_REASONS } from '../../lib/constants';

export default function CareerToolsPage() {
  const { profile, candidateProfile } = useAuth();

  const [activeTab, setActiveTab] = useState('reframer'); // 'reframer' | 'resume'

  // Reframer inputs
  const [formData, setFormData] = useState({
    previousRole: candidateProfile?.previous_role || 'Senior Software Engineer',
    yearsExperience: candidateProfile?.years_of_experience || '4',
    breakDuration: candidateProfile?.break_duration_months || '24',
    breakReason: candidateProfile?.break_reason || 'Maternity & Childcare',
    targetRole: candidateProfile?.career_interests?.[0] || 'Technical Project Manager',
    skills: candidateProfile?.existing_skills || ['React.js', 'Agile / Scrum', 'Team Leadership'],
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    try {
      const result = await generateGapReframing(formData);
      setAiResult(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const printResume = () => {
    window.print();
  };

  return (
    <DashboardLayout
      role="candidate"
      title="AI Career Comeback Studio 🌸"
      subtitle="Reframing career gaps into leadership assets with specialized AI coaching."
    >
      <div className="space-y-6">
        {/* Navigation Tabs */}
        <div className="flex border-b border-purple-100 bg-white p-1.5 rounded-2xl shadow-xs max-w-md">
          <button
            onClick={() => setActiveTab('reframer')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'reframer'
                ? 'bg-purple-600 text-white shadow-soft'
                : 'text-gray-600 hover:text-purple-700'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Gap Reframer & Interview</span>
          </button>
          <button
            onClick={() => setActiveTab('resume')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'resume'
                ? 'bg-purple-600 text-white shadow-soft'
                : 'text-gray-600 hover:text-purple-700'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>AI Resume Studio</span>
          </button>
        </div>

        {/* TAB 1: GAP REFRAMER */}
        {activeTab === 'reframer' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Form Controls */}
            <div className="lg:col-span-5 space-y-5">
              <Card className="p-6 bg-white border-purple-100">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-purple-50">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">Configure Your Journey</h3>
                    <p className="text-[11px] text-gray-400">Tailor the AI prompt to your exact story</p>
                  </div>
                </div>

                <form onSubmit={handleGenerate} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Previous Role</label>
                    <input
                      type="text"
                      value={formData.previousRole}
                      onChange={(e) => setFormData({ ...formData, previousRole: e.target.value })}
                      className="w-full rounded-xl border border-purple-100 p-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">Prior Experience (Yrs)</label>
                      <input
                        type="number"
                        step="0.5"
                        value={formData.yearsExperience}
                        onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value })}
                        className="w-full rounded-xl border border-purple-100 p-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">Break Duration (Mos)</label>
                      <input
                        type="number"
                        value={formData.breakDuration}
                        onChange={(e) => setFormData({ ...formData, breakDuration: e.target.value })}
                        className="w-full rounded-xl border border-purple-100 p-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Break Reason / Context</label>
                    <select
                      value={formData.breakReason}
                      onChange={(e) => setFormData({ ...formData, breakReason: e.target.value })}
                      className="w-full rounded-xl border border-purple-100 p-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                      {CAREER_BREAK_REASONS.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Target Next Role</label>
                    <input
                      type="text"
                      value={formData.targetRole}
                      onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
                      placeholder="e.g. Product Manager, Lead Engineer"
                      className="w-full rounded-xl border border-purple-100 p-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400"
                      required
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="accent"
                      size="md"
                      loading={isGenerating}
                      className="w-full"
                      icon={Sparkles}
                    >
                      Generate AI Comeback Script
                    </Button>
                  </div>
                </form>
              </Card>

              {/* Coaching Card */}
              <Card className="p-5 bg-gradient-to-br from-purple-50 via-pink-50/40 to-white border-purple-100">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                    <Lightbulb className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-purple-950">Why This Works</h4>
                    <p className="text-[11px] text-purple-900/80 mt-1 leading-relaxed">
                      Recruiters respect honesty combined with forward-looking enthusiasm. This tool structures your story using the <strong>STAR format</strong> so you own your career break with poise and pride.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column: AI Outputs */}
            <div className="lg:col-span-7 space-y-6">
              {!aiResult && !isGenerating ? (
                <Card className="p-10 text-center border-dashed border-2 border-purple-200 bg-white flex flex-col items-center justify-center min-h-[400px]">
                  <div className="w-14 h-14 rounded-3xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900">Your Comeback Kit Is Ready To Generate</h3>
                  <p className="text-xs text-gray-500 max-w-sm mt-1 mb-6 leading-relaxed">
                    Click "Generate AI Comeback Script" to synthesize your prior achievements and time away into an empowering resume summary, interview response, and transferable skill matrix.
                  </p>
                  <Button variant="accent" size="sm" onClick={handleGenerate} icon={Sparkles}>
                    Generate Now
                  </Button>
                </Card>
              ) : isGenerating ? (
                <Card className="p-12 text-center bg-white flex flex-col items-center justify-center min-h-[400px]">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 text-white flex items-center justify-center mb-4 animate-spin">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900">Crafting Your Comeback Story...</h3>
                  <p className="text-xs text-gray-500 mt-1">Reframing pause into proven adaptability and leadership</p>
                </Card>
              ) : (
                <div className="space-y-6">
                  {/* 1. Resume Summary Statement */}
                  <Card className="p-6 bg-white border-purple-100 shadow-soft">
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-purple-50">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-purple-600" />
                        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                          Empowering Resume Summary
                        </h4>
                      </div>
                      <button
                        onClick={() => handleCopy(aiResult.resumeSummary, 'resumeSummary')}
                        className="text-xs text-purple-700 hover:text-purple-900 flex items-center gap-1 font-semibold"
                      >
                        {copiedField === 'resumeSummary' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy for Resume</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed bg-purple-50/50 p-4 rounded-xl border border-purple-100/60 font-serif italic">
                      "{aiResult.resumeSummary}"
                    </p>
                  </Card>

                  {/* 2. Interview Script */}
                  <Card className="p-6 bg-white border-purple-100 shadow-soft">
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-purple-50">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-purple-600" />
                        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                          Interview Answer: "Can you explain this gap?"
                        </h4>
                      </div>
                      <button
                        onClick={() => handleCopy(aiResult.interviewScript, 'interviewScript')}
                        className="text-xs text-purple-700 hover:text-purple-900 flex items-center gap-1 font-semibold"
                      >
                        {copiedField === 'interviewScript' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Script</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-gray-800 leading-relaxed bg-gradient-to-r from-purple-50/60 to-pink-50/30 p-4 rounded-xl border border-purple-100/70">
                      {aiResult.interviewScript}
                    </p>
                    <div className="mt-3 flex items-center gap-1.5 text-[11px] text-purple-700 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                      <span>STAR Framework Applied: Situation &rarr; Transition &rarr; Growth &rarr; Ready for Role</span>
                    </div>
                  </Card>

                  {/* 3. Transferable Skills Matrix */}
                  <Card className="p-6 bg-white border-purple-100 shadow-soft">
                    <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
                      Transferable Leadership Skills Unlocked
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {aiResult.transferableSkills.map((item, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl border border-purple-50 bg-purple-50/30 hover:border-purple-200 transition-colors">
                          <h5 className="font-bold text-xs text-purple-950">{item.skill}</h5>
                          <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">{item.description}</p>
                          <div className="mt-2 pt-2 border-t border-purple-100/60 flex items-center justify-between">
                            <span className="text-[10px] text-purple-700 font-semibold truncate max-w-[180px]">
                              "{item.bulletPoint}"
                            </span>
                            <button
                              onClick={() => handleCopy(item.bulletPoint, `skill_${idx}`)}
                              className="text-[10px] text-purple-700 hover:underline flex items-center gap-0.5 shrink-0"
                            >
                              {copiedField === `skill_${idx}` ? 'Copied' : 'Copy'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* 4. Confidence Coach Message */}
                  {aiResult.confidenceTip && (
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs shadow-soft flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Award className="w-5 h-5 shrink-0" />
                        <p className="leading-relaxed font-medium">{aiResult.confidenceTip}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: AI RESUME STUDIO */}
        {activeTab === 'resume' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Comeback-Optimized Resume View</h3>
                <p className="text-xs text-gray-500">Live generated preview tailored for returnship hiring managers</p>
              </div>
              <Button variant="accent" size="sm" onClick={printResume} icon={Printer}>
                Print / Save as PDF
              </Button>
            </div>

            {/* Resume Sheet Container */}
            <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-200 shadow-xl max-w-4xl mx-auto space-y-8 font-sans">
              {/* Header */}
              <div className="border-b border-gray-200 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                    {profile?.full_name || 'Aaditya Ravi'}
                  </h1>
                  <p className="text-sm font-semibold text-purple-700 mt-1">
                    {candidateProfile?.previous_role || 'Senior Software Engineer'} &bull; Comeback Professional
                  </p>
                </div>
                <div className="text-xs text-gray-500 space-y-1 sm:text-right">
                  <p>{profile?.email || 'user@example.com'}</p>
                  <p>{candidateProfile?.location || 'Remote / Hybrid'}</p>
                  <p>Work Mode: {candidateProfile?.preferred_work_type || 'Flexible'}</p>
                </div>
              </div>

              {/* Summary Statement */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-purple-900 border-b border-purple-100 pb-1 mb-2">
                  Professional Profile & Career Return
                </h2>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {aiResult?.resumeSummary ||
                    `Accomplished ${candidateProfile?.previous_role || 'Specialist'} with proven expertise, transitioning back into high-impact roles following an intentional career pause dedicated to family and leadership growth. Combines strong domain problem-solving with renewed perspective, exceptional adaptability, and modern industry workflows.`}
                </p>
              </div>

              {/* Career Gap Section with Empowerment */}
              <div className="bg-purple-50/50 p-4 rounded-xl border border-purple-100">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-xs font-bold text-purple-950">
                    Career Transition & Leadership Development
                  </h3>
                  <span className="text-[11px] font-semibold text-purple-700">
                    {candidateProfile?.break_duration_months || 24} Months
                  </span>
                </div>
                <p className="text-[11px] text-purple-900/80 mb-2 italic">
                  Focus: {candidateProfile?.break_reason || 'Caregiving, Project Management & Upskilling'}
                </p>
                <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                  <li>Orchestrated complex scheduling, crisis management, and long-term priority execution.</li>
                  <li>Maintained continuous learning and domain skill development in modern tech workflows.</li>
                  <li>Developed high emotional intelligence, active negotiation skills, and composure under pressure.</li>
                </ul>
              </div>

              {/* Professional Experience */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-purple-900 border-b border-purple-100 pb-1 mb-3">
                  Prior Experience
                </h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-xs font-bold text-gray-900">
                        {candidateProfile?.previous_role || 'Previous Role'}
                      </h3>
                      <span className="text-xs text-gray-400">
                        {candidateProfile?.years_of_experience || '3+'} Years Tenure
                      </span>
                    </div>
                    <p className="text-xs text-purple-600 font-medium">
                      {candidateProfile?.previous_company || 'Previous Employer'}
                    </p>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                      Delivered high-value initiatives, led key projects, and collaborated with cross-functional partners to execute deliverables with high quality standards.
                    </p>
                  </div>
                </div>
              </div>

              {/* Core Skills */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-purple-900 border-b border-purple-100 pb-1 mb-2">
                  Skills & Proficiencies
                </h2>
                <div className="flex flex-wrap gap-2 pt-1">
                  {(candidateProfile?.existing_skills?.length ? candidateProfile.existing_skills : ['React.js', 'Python', 'Agile / Scrum', 'UI/UX Design', 'Leadership']).map((skill) => (
                    <span key={skill} className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-800 text-xs font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-purple-900 border-b border-purple-100 pb-1 mb-2">
                  Education
                </h2>
                <p className="text-xs font-bold text-gray-900">
                  {candidateProfile?.education || 'Bachelor Degree in Technology / Business'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
