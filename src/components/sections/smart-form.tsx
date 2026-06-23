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
import { ArrowRight, ArrowLeft, Loader2, Sparkles } from 'lucide-react';
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

    // Mock network request
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Clear autosave
    localStorage.removeItem('shradha-diagnostic-form');
    setIsSubmitting(false);

    trackEvent({
      category: 'Form',
      action: 'submit_diagnostics_form_success',
    });
    
    onSuccess();
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

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    {/* CELPIP Radio Card */}
                    <label className="cursor-pointer group">
                      <input
                        type="radio"
                        value="celpip"
                        {...register('track')}
                        className="sr-only peer"
                      />
                      <div className="h-full p-6 rounded-2xl border border-border bg-card-bg transition-all duration-300 peer-checked:border-accent peer-checked:bg-accent/5 dark:peer-checked:bg-accent/10 hover:border-neutral-300 dark:hover:border-neutral-800 group-hover:scale-[1.01] flex flex-col items-center text-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-accent/5 dark:bg-accent/15 text-accent flex items-center justify-center font-display font-bold">
                          C
                        </div>
                        <div>
                          <p className="font-display font-bold text-base text-foreground">CELPIP Prep</p>
                          <p className="text-xs text-muted mt-1 leading-snug">Canadian PR & Citizenship</p>
                        </div>
                      </div>
                    </label>

                    {/* DET Radio Card */}
                    <label className="cursor-pointer group">
                      <input
                        type="radio"
                        value="det"
                        {...register('track')}
                        className="sr-only peer"
                      />
                      <div className="h-full p-6 rounded-2xl border border-border bg-card-bg transition-all duration-300 peer-checked:border-accent peer-checked:bg-accent/5 dark:peer-checked:bg-accent/10 hover:border-neutral-300 dark:hover:border-neutral-800 group-hover:scale-[1.01] flex flex-col items-center text-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-accent/5 dark:bg-accent/15 text-accent flex items-center justify-center font-display font-bold">
                          D
                        </div>
                        <div>
                          <p className="font-display font-bold text-base text-foreground">Duolingo test</p>
                          <p className="text-xs text-muted mt-1 leading-snug">University Admissions</p>
                        </div>
                      </div>
                    </label>

                    {/* Corporate Radio Card */}
                    <label className="cursor-pointer group">
                      <input
                        type="radio"
                        value="corporate"
                        {...register('track')}
                        className="sr-only peer"
                      />
                      <div className="h-full p-6 rounded-2xl border border-border bg-card-bg transition-all duration-300 peer-checked:border-accent peer-checked:bg-accent/5 dark:peer-checked:bg-accent/10 hover:border-neutral-300 dark:hover:border-neutral-800 group-hover:scale-[1.01] flex flex-col items-center text-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-accent/5 dark:bg-accent/15 text-accent flex items-center justify-center font-display font-bold">
                          B
                        </div>
                        <div>
                          <p className="font-display font-bold text-base text-foreground">Corporate English</p>
                          <p className="text-xs text-muted mt-1 leading-snug">Professional Mastery</p>
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
                          <select
                            id="celpipTargetScore"
                            {...register('celpipTargetScore')}
                            className="flex h-12 w-full rounded-2xl border border-border bg-card-bg px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent text-foreground cursor-pointer"
                          >
                            <option value="">Select Band...</option>
                            <option value="7">Band 7</option>
                            <option value="8">Band 8</option>
                            <option value="9">Band 9</option>
                            <option value="10">Band 10</option>
                            <option value="10-plus">Band 10+</option>
                          </select>
                          {errors.celpipTargetScore && (
                            <span className="text-xs text-red-500 font-semibold">{errors.celpipTargetScore.message}</span>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="celpipExamDate">Expected Exam Date</Label>
                          <Input
                            id="celpipExamDate"
                            type="date"
                            {...register('celpipExamDate')}
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
                                {...register('celpipWeakestSkill')}
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
                          <select
                            id="detTargetScore"
                            {...register('detTargetScore')}
                            className="flex h-12 w-full rounded-2xl border border-border bg-card-bg px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent text-foreground cursor-pointer"
                          >
                            <option value="">Select Score...</option>
                            <option value="100">100 - 105</option>
                            <option value="110">110 - 115</option>
                            <option value="120">120 - 125</option>
                            <option value="130">130 - 135</option>
                            <option value="140">140+</option>
                          </select>
                          {errors.detTargetScore && (
                            <span className="text-xs text-red-500 font-semibold">{errors.detTargetScore.message}</span>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="detTestDate">Estimated Test Date</Label>
                          <Input
                            id="detTestDate"
                            type="date"
                            {...register('detTestDate')}
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
                              <div className="w-4 h-4 rounded-full border border-border flex items-center justify-center peer-checked:border-accent">
                                <div className="w-2 h-2 rounded-full bg-accent scale-0 peer-checked:scale-100 transition-transform" />
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
                            {...register('corporateRole')}
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
                            {...register('corporateIndustry')}
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
                                {...register('corporateChallenge')}
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
                        {...register('name')}
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
                        {...register('email')}
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
                      <select
                        id="timezone"
                        {...register('timezone')}
                        className="flex h-12 w-full rounded-2xl border border-border bg-card-bg px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent text-foreground cursor-pointer"
                      >
                        <option value="IST">India Standard Time (IST)</option>
                        <option value="EST">Eastern Time (EST)</option>
                        <option value="PST">Pacific Time (PST)</option>
                        <option value="GMT">Greenwich Mean Time (GMT)</option>
                        <option value="CET">Central European Time (CET)</option>
                        <option value="AEST">Australian Eastern Time (AEST)</option>
                      </select>
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
