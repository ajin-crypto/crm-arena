import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLeadsStore } from '@/store/useLeadsStore'
import { useCreateLead } from '@/hooks/useLeads'
import { cn } from '@/utils/cn'

const schema = z.object({
  name:    z.string().min(2, 'Name must be at least 2 characters'),
  email:   z.string().email('Enter a valid email address'),
  company: z.string().min(1, 'Company is required'),
  phone:   z.string().optional(),
  status:  z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'LOST']),
  source:  z.string().min(1, 'Lead source is required'),
})

function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-[11px] text-error font-medium">{error}</p>
      )}
    </div>
  )
}

const inputClass =
  'w-full bg-surface-container-highest border-none rounded-xl px-4 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0 transition-shadow'

export default function CreateLeadModal() {
  const { isCreateModalOpen, closeCreateModal } = useLeadsStore()
  const createLead = useCreateLead()

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { status: 'NEW', source: 'Organic Search' },
  })

  async function onSubmit(data) {
    try {
      await createLead.mutateAsync(data)
      reset()
      closeCreateModal()
    } catch {
      setError('root', { message: 'Failed to create lead. Please try again.' })
    }
  }

  function handleClose() {
    reset()
    closeCreateModal()
  }

  return (
    <Transition appear show={isCreateModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[60]" onClose={handleClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200" enterFrom="opacity-0" enterTo="opacity-100"
          leave="ease-in duration-150"  leaveFrom="opacity-100" leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-on-surface/20 backdrop-blur-sm" />
        </Transition.Child>

        {/* Modal panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"  leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-lg bg-surface-container-lowest rounded-2xl shadow-ambient p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <Dialog.Title className="font-headline font-extrabold text-xl text-on-surface">
                    Create New Lead
                  </Dialog.Title>
                  <p className="text-sm text-on-surface-variant mt-1">
                    Add a new lead to your pipeline.
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-full hover:bg-surface-container transition-colors text-on-surface-variant"
                >
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                {/* Name */}
                <Field label="Full Name" error={errors.name?.message}>
                  <input
                    {...register('name')}
                    placeholder="e.g. Jordan Donovan"
                    className={cn(inputClass, errors.name && 'ring-2 ring-error')}
                  />
                </Field>

                {/* Email */}
                <Field label="Email Address" error={errors.email?.message}>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="e.g. jordan@vortex.io"
                    className={cn(inputClass, errors.email && 'ring-2 ring-error')}
                  />
                </Field>

                {/* Company + Phone side by side */}
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Company" error={errors.company?.message}>
                    <input
                      {...register('company')}
                      placeholder="e.g. Vortex Dynamics"
                      className={cn(inputClass, errors.company && 'ring-2 ring-error')}
                    />
                  </Field>
                  <Field label="Phone (optional)">
                    <input
                      {...register('phone')}
                      type="tel"
                      placeholder="+1 555 000 0000"
                      className={inputClass}
                    />
                  </Field>
                </div>

                {/* Status + Source side by side */}
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Status" error={errors.status?.message}>
                    <select
                      {...register('status')}
                      className={cn(inputClass, 'cursor-pointer')}
                    >
                      {['NEW', 'CONTACTED', 'QUALIFIED', 'LOST'].map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Lead Source" error={errors.source?.message}>
                    <select
                      {...register('source')}
                      className={cn(inputClass, 'cursor-pointer')}
                    >
                      {['Organic Search', 'Referral', 'Cold Outreach', 'Paid Ads', 'Webinar', 'Social Media', 'LinkedIn'].map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </Field>
                </div>

                {/* Root error */}
                {errors.root && (
                  <p className="text-xs text-error font-medium text-center">{errors.root.message}</p>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 py-2.5 bg-surface-container-high text-on-surface font-semibold rounded-full hover:bg-surface-container-highest transition-colors text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || createLead.isPending}
                    className="flex-1 py-2.5 hero-gradient text-on-primary font-bold rounded-full shadow-lg shadow-primary/20 hover:brightness-110 transition-all active:scale-95 text-sm disabled:opacity-60"
                  >
                    {(isSubmitting || createLead.isPending) ? 'Creating…' : 'Create Lead'}
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
