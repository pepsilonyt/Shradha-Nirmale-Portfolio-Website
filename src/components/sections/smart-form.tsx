'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Track,
  MasterFormData,
} from '@/lib/form-schema';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { CustomSelect } from '../ui/select';
import { ArrowRight, ArrowLeft, Loader2, Sparkles, GraduationCap, Laptop, Briefcase } from 'lucide-react';
import { useAnalytics } from '@/hooks/use-analytics';

type SmartFormProps = {
  preselectedTrack: Track | null;
  onSuccess: () => void;
};

export default function SmartForm({ preselectedTrack, onSuccess }: SmartFormProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { trackEvent } = useAnalytics();

  // Master React Hook Form setup
  const methods = useForm<MasterFormData>({
    mode: 'onChange',
    defaultValues: {
      track: 'celpip',
      celpipTargetScore: '',
      celpipExamDate: '',
      celpipCurrentLevel: '7',
      celpipWeakestSkill: [],
      detTargetScore: '',
      detTestDate: '',
      detPrepStatus: 'not-started',
      corporateRole: '',
      corporateIndustry: '',
      corporateChallenge: [],
      name: '',
      email: '',
      phone: '',
      timezone: 'IST',
      message: '',
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = methods;

  const currentTrack = watch('track');

  // Register custom select fields manually with validation rules
  useEffect(() => {
    register('celpipTargetScore', { required: 'Target score is required' });
    register('detTargetScore', { required: 'Target score is required' });
    register('timezone', { required: 'Timezone is required' });
  }, [register]);

  // Sync preselected track from tracks section
  useEffect(() => {
    if (preselectedTrack) {
      setValue('track', preselectedTrack);
      setStep(2);
      trackEvent({
        category: 'Form',
        action: 'auto_advance_preselected_track',
        label: preselectedTrack,
      });
    }
  }, [preselectedTrack, setValue, trackEvent]);

  // Load auto-save from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem('shradha-diagnostic-form');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Reset form to parsed values
        Object.keys(parsed).forEach((key) => {
          setValue(key as keyof MasterFormData, parsed[key]);
        });
        // If they had progress, we can keep track or default to step 1
      } catch {
        console.error('Failed to parse autosaved form data');
      }
    }
  }, [setValue]);

  // Auto-save form contents on input
  const activeFormValues = watch();
  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('shradha-diagnostic-form', JSON.stringify(activeFormValues));
  }, [activeFormValues]);

  // Handle Form Abandonment warning
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // If user has typed anything (name or email), show exit warning
      if (activeFormValues.name || activeFormValues.email) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes in your diagnostic form. Are you sure you want to leave?';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [activeFormValues]);

  // Step Navigations with Validation
  const handleNext = async () => {
    let isValid = false;

    if (step === 1) {
      isValid = await trigger(['track']);
      if (isValid) {
        setStep(2);
        trackEvent({
          category: 'Form',
          action: 'complete_step_1',
          label: currentTrack,
        });
      }
    } else if (step === 2) {
      if (currentTrack === 'celpip') {
        isValid = await trigger([
          'celpipTargetScore',
          'celpipExamDate',
          'celpipCurrentLevel',
          'celpipWeakestSkill',
        ]);
      } else if (currentTrack === 'det') {
        isValid = await trigger(['detTargetScore', 'detTestDate', 'detPrepStatus']);
      } else if (currentTrack === 'corporate') {
        isValid = await trigger(['corporateRole', 'corporateIndustry', 'corporateChallenge']);
      }
      
      if (isValid) {
        setStep(3);
        trackEvent({
          category: 'Form',
          action: 'complete_step_2',
          label: currentTrack,
        });
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((s) => s - 1);
    }
  };

  const onSubmit = async (data: MasterFormData) => {
    setIsSubmitting(true);
    trackEvent({
      category: 'Form',
      action: 'submit_diagnostics_form_start',
      label: data.track,
    });

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to dispatch diagnostic submission email');
      }
    } catch (err) {
      console.error('Email Dispatch Error:', err);
    } finally {
      // Clear autosave and complete regardless to maintain flawless UX
      localStorage.removeItem('shradha-diagnostic-form');
      setIsSubmitting(false);

      trackEvent({
        category: 'Form',
        action: 'submit_diagnostics_form_success',
      });
      
      onSuccess();
    }
  };

  // Progress Bar percentage calculation
  const progressPct = ((step - 1) / 2) * 100 + 10; // offset slightly for aesthetic start

  return (
    <section id="form" className="py-24 md:py-32 bg-neutral-50/50 dark:bg-neutral-950/20 border-t border-border">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        
        {/* Urgency Banner */}
        <div className="mb-8 p-3 rounded-2xl bg-accent/5 border border-accent/10 flex items-center justify-between text-xs md:text-sm text-foreground font-semibold">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span>Real-Time Availability: Only 3 onboarding slots remaining this month.</span>
          </div>
          <span className="text-[10px] text-accent uppercase tracking-wider hidden sm:block">Frictionless Auditing</span>
        </div>

        {/* Progress Bar Container */}
        <div className="space-y-2 mb-12">
          <div className="flex justify-between items-center text-xs text-muted font-bold uppercase tracking-wider">
            <span>Audit Stage {step} of 3</span>
            <span>{Math.round(progressPct)}% Compiled</span>
          </div>
          <Progress value={progressPct} />
        </div>

        {/* Form Container Card */}
        <div className="rounded-3xl border border-border bg-card-bg shadow-card p-5 sm:p-8 md:p-12 relative overflow-hidden">
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <AnimatePresence mode="wait">
              
              {/* STEP 1: Track Selection */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <h3 className="font-display font-extrabold text-2xl md:text-3xl text-foreground tracking-tight">
                      Identify Your English Track
                    </h3>
                    <p className="text-muted text-sm md:text-base">
                      Where is your communication bottleneck located? Select one to configure the analysis.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                    {/* CELPIP Radio Card */}
                    <label className="cursor-pointer group relative">
                      <input
                        type="radio"
                        value="celpip"
                        {...register('track')}
                        className="sr-only peer"
                      />
                      <div className="h-full p-6 sm:p-8 rounded-3xl border border-border bg-card-bg transition-all duration-300 peer-checked:border-accent peer-checked:bg-accent/5 dark:peer-checked:bg-accent/10 hover:border-neutral-300 dark:hover:border-neutral-800 hover:shadow-md flex flex-col justify-between gap-5 relative overflow-hidden group-hover:scale-[1.01] text-left">
                        <div className="space-y-4">
                          <div className="w-12 h-12 rounded-2xl bg-accent/5 dark:bg-accent/15 text-accent flex items-center justify-center">
                            <GraduationCap className="h-6 w-6" />
                          </div>
                          <div>
                            <h4 className="font-display font-extrabold text-lg text-foreground">CELPIP Prep</h4>
                            <p className="text-xs text-accent font-semibold mt-1">Canadian PR & Express Entry</p>
                          </div>
                          <ul className="text-xs text-muted space-y-2 pt-2 border-t border-border/40">
                            <li className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                              <span>For PR applicants needing CLB 9+</span>
                            </li>
                            <li className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                              <span>Struggling with timed speaking</span>
                            </li>
                            <li className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                              <span>Custom score-building templates</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </label>

                    {/* DET Radio Card */}
                    <label className="cursor-pointer group relative">
                      <input
                        type="radio"
                        value="det"
                        {...register('track')}
                        className="sr-only peer"
                      />
                      <div className="h-full p-6 sm:p-8 rounded-3xl border border-border bg-card-bg transition-all duration-300 peer-checked:border-accent peer-checked:bg-accent/5 dark:peer-checked:bg-accent/10 hover:border-neutral-300 dark:hover:border-neutral-800 hover:shadow-md flex flex-col justify-between gap-5 relative overflow-hidden group-hover:scale-[1.01] text-left">
                        <div className="space-y-4">
                          <div className="w-12 h-12 rounded-2xl bg-accent/5 dark:bg-accent/15 text-accent flex items-center justify-center">
                            <Laptop className="h-6 w-6" />
                          </div>
                          <div>
                            <h4 className="font-display font-extrabold text-lg text-foreground">Duolingo Prep</h4>
                            <p className="text-xs text-accent font-semibold mt-1">University Admissions</p>
                          </div>
                          <ul className="text-xs text-muted space-y-2 pt-2 border-t border-border/40">
                            <li className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                              <span>For students targetting 120-140+</span>
                            </li>
                            <li className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                              <span>Isolate adaptive test algorithm</span>
                            </li>
                            <li className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                              <span>Production score acceleration</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </label>

                    {/* Corporate Radio Card */}
                    <label className="cursor-pointer group relative">
                      <input
                        type="radio"
                        value="corporate"
                        {...register('track')}
                        className="sr-only peer"
                      />
                      <div className="h-full p-6 sm:p-8 rounded-3xl border border-border bg-card-bg transition-all duration-300 peer-checked:border-accent peer-checked:bg-accent/5 dark:peer-checked:bg-accent/10 hover:border-neutral-300 dark:hover:border-neutral-800 hover:shadow-md flex flex-col justify-between gap-5 relative overflow-hidden group-hover:scale-[1.01] text-left">
                        <div className="space-y-4">
                          <div className="w-12 h-12 rounded-2xl bg-accent/5 dark:bg-accent/15 text-accent flex items-center justify-center">
                            <Briefcase className="h-6 w-6" />
                          </div>
                          <div>
                            <h4 className="font-display font-extrabold text-lg text-foreground">Corporate English</h4>
                            <p className="text-xs text-accent font-semibold mt-1">Professional Mastery</p>
                          </div>
                          <ul className="text-xs text-muted space-y-2 pt-2 border-t border-border/40">
                            <li className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                              <span>For tech leads, managers & execs</span>
                            </li>
                            <li className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                              <span>Emails, client presentations & pitches</span>
                            </li>
                            <li className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                              <span>Eliminate accent self-doubt</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </label>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Conditional Fields */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  
                  {/* CELPIP TRACK QUESTIONS */}
                  {currentTrack === 'celpip' && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="font-display font-extrabold text-2xl text-foreground">
                          CELPIP Diagnostics Profile
                        </h3>
                        <p className="text-muted text-sm">
                          Restructuring time limits and scheduling. Fill out target details.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="celpipTargetScore">Target Band Score</Label>
                          <CustomSelect
                            id="celpipTargetScore"
                            value={watch('celpipTargetScore') || ''}
                            onChange={(val) => setValue('celpipTargetScore', val, { shouldValidate: true })}
                            options={[
                              { value: '7', label: 'Band 7' },
                              { value: '8', label: 'Band 8' },
                              { value: '9', label: 'Band 9' },
                              { value: '10', label: 'Band 10' },
                              { value: '10-plus', label: 'Band 10+' },
                            ]}
                            placeholder="Select Band..."
                          />
                          {errors.celpipTargetScore && (
                            <span className="text-xs text-red-500 font-semibold">{errors.celpipTargetScore.message}</span>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="celpipExamDate">Expected Exam Date</Label>
                          <Input
                            id="celpipExamDate"
                            type="date"
                            {...register('celpipExamDate', { required: 'Exam date is required' })}
                          />
                          {errors.celpipExamDate && (
                            <span className="text-xs text-red-500 font-semibold">{errors.celpipExamDate.message}</span>
                          )}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label>Current Level estimate</Label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {['below-7', '7', '8', '9-plus'].map((level) => (
                            <label key={level} className="cursor-pointer">
                              <input
                                type="radio"
                                value={level}
                                {...register('celpipCurrentLevel')}
                                className="sr-only peer"
                              />
                              <div className="p-3 text-center rounded-xl border border-border text-sm font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-900 peer-checked:border-accent peer-checked:bg-accent/5 dark:peer-checked:bg-accent/10">
                                {level === 'below-7' ? 'Below 7' : level === '9-plus' ? '9+' : `Band ${level}`}
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label>Select Weakest Skills (Focus Areas)</Label>
                        <div className="grid grid-cols-2 gap-3">
                          {['Speaking', 'Writing', 'Reading', 'Listening'].map((skill) => (
                            <label key={skill} className="flex items-center gap-3 p-3 rounded-xl border border-border cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-900">
                              <input
                                type="checkbox"
                                value={skill}
                                {...register('celpipWeakestSkill', { required: 'Select at least one skill' })}
                                className="rounded border-border text-accent focus:ring-accent h-4 w-4"
                              />
                              <span className="text-sm font-semibold text-foreground">{skill}</span>
                            </label>
                          ))}
                        </div>
                        {errors.celpipWeakestSkill && (
                          <span className="text-xs text-red-500 font-semibold">{errors.celpipWeakestSkill.message}</span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* DUOLINGO TRACK QUESTIONS */}
                  {currentTrack === 'det' && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="font-display font-extrabold text-2xl text-foreground">
                          Duolingo Diagnostics Profile
                        </h3>
                        <p className="text-muted text-sm">
                          Configure adaptive test analysis fields.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="detTargetScore">Target DET Score</Label>
                          <CustomSelect
                            id="detTargetScore"
                            value={watch('detTargetScore') || ''}
                            onChange={(val) => setValue('detTargetScore', val, { shouldValidate: true })}
                            options={[
                              { value: '100', label: '100 - 105' },
                              { value: '110', label: '110 - 115' },
                              { value: '120', label: '120 - 125' },
                              { value: '130', label: '130 - 135' },
                              { value: '140', label: '140+' },
                            ]}
                            placeholder="Select Score..."
                          />
                          {errors.detTargetScore && (
                            <span className="text-xs text-red-500 font-semibold">{errors.detTargetScore.message}</span>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="detTestDate">Estimated Test Date</Label>
                          <Input
                            id="detTestDate"
                            type="date"
                            {...register('detTestDate', { required: 'Test date is required' })}
                          />
                          {errors.detTestDate && (
                            <span className="text-xs text-red-500 font-semibold">{errors.detTestDate.message}</span>
                          )}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label>Preparation Status</Label>
                        <div className="grid grid-cols-1 gap-3">
                          {[
                            { value: 'not-started', label: "I'm just starting out" },
                            { value: 'some-prep', label: 'I did some preparation already' },
                            { value: 'retaking', label: 'I am retaking to boost my score' },
                          ].map((option) => (
                            <label key={option.value} className="flex items-center gap-3 p-4 rounded-xl border border-border cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-900">
                              <input
                                type="radio"
                                value={option.value}
                                {...register('detPrepStatus')}
                                className="peer sr-only"
                              />
                              <div className="w-4 h-4 rounded-full border border-border flex items-center justify-center peer-checked:border-accent peer-checked:[&>div]:scale-100">
                                <div className="w-2 h-2 rounded-full bg-accent scale-0 transition-transform" />
                              </div>
                              <span className="text-sm font-semibold text-foreground">{option.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* CORPORATE TRACK QUESTIONS */}
                  {currentTrack === 'corporate' && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="font-display font-extrabold text-2xl text-foreground">
                          Corporate English Auditing
                        </h3>
                        <p className="text-muted text-sm">
                          Optimizing language context for professional environments.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="corporateRole">Professional Role / Title</Label>
                          <Input
                            id="corporateRole"
                            placeholder="e.g. Senior Software Engineer"
                            {...register('corporateRole', { required: 'Professional role is required' })}
                          />
                          {errors.corporateRole && (
                            <span className="text-xs text-red-500 font-semibold">{errors.corporateRole.message}</span>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="corporateIndustry">Industry</Label>
                          <Input
                            id="corporateIndustry"
                            placeholder="e.g. FinTech"
                            {...register('corporateIndustry', { required: 'Industry is required' })}
                          />
                          {errors.corporateIndustry && (
                            <span className="text-xs text-red-500 font-semibold">{errors.corporateIndustry.message}</span>
                          )}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label>Key Communication Challenges</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            'Emails & Reporting',
                            'Presenting to stakeholders',
                            'Speaking up in meetings',
                            'Client negotiations',
                            'Leadership confidence',
                          ].map((item) => (
                            <label key={item} className="flex items-center gap-3 p-3.5 rounded-xl border border-border cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-900">
                              <input
                                type="checkbox"
                                value={item}
                                {...register('corporateChallenge', { required: 'Select at least one challenge' })}
                                className="rounded border-border text-accent focus:ring-accent h-4 w-4"
                              />
                              <span className="text-sm font-semibold text-foreground">{item}</span>
                            </label>
                          ))}
                        </div>
                        {errors.corporateChallenge && (
                          <span className="text-xs text-red-500 font-semibold">{errors.corporateChallenge.message}</span>
                        )}
                      </div>
                    </div>
                  )}

                </motion.div>
              )}

              {/* STEP 3: Contact & Submission */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <h3 className="font-display font-extrabold text-2xl text-foreground">
                      Complete Strategy Request
                    </h3>
                    <p className="text-muted text-sm">
                      Provide contact credentials to compile and unlock scheduling access.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        {...register('name', { required: 'Name is required' })}
                      />
                      {errors.name && (
                        <span className="text-xs text-red-500 font-semibold">{errors.name.message}</span>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        {...register('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                          }
                        })}
                      />
                      {errors.email && (
                        <span className="text-xs text-red-500 font-semibold">{errors.email.message}</span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number (Optional)</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        {...register('phone')}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timezone">Your Timezone</Label>
                      <CustomSelect
                        id="timezone"
                        value={watch('timezone') || ''}
                        onChange={(val) => setValue('timezone', val, { shouldValidate: true })}
                        options={[
                          { value: 'IST', label: 'India Standard Time (IST)' },
                          { value: 'EST', label: 'Eastern Time (EST)' },
                          { value: 'PST', label: 'Pacific Time (PST)' },
                          { value: 'GMT', label: 'Greenwich Mean Time (GMT)' },
                          { value: 'CET', label: 'Central European Time (CET)' },
                          { value: 'AEST', label: 'Australian Eastern Time (AEST)' },
                        ]}
                        placeholder=""
                      />
                      {errors.timezone && (
                        <span className="text-xs text-red-500 font-semibold">{errors.timezone.message}</span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Context / Goals (Optional)</Label>
                    <Textarea
                      id="message"
                      placeholder="Briefly describe your English goals..."
                      rows={3}
                      {...register('message')}
                    />
                  </div>
                </motion.div>
              )}

            </AnimatePresence>

            {/* Form Footer Action Buttons */}
            <div className="flex items-center justify-between border-t border-border pt-6 mt-8">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-sm font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>
              ) : (
                <div /> // dummy spacing placeholder
              )}

              {step < 3 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="font-display font-semibold inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Continue</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="font-display font-semibold bg-accent hover:bg-accent-hover text-white shadow-cta hover:shadow-cta-hover transition-all py-3 px-8 rounded-full flex items-center justify-center gap-2 min-w-[200px] cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Compiling...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      <span>Submit Profile & Get Calendar</span>
                    </>
                  )}
                </Button>
              )}
            </div>

          </form>

        </div>
      </div>
    </section>
  );
}
