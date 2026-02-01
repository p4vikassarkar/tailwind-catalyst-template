'use client'

import * as Headless from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Heading } from './heading'

export function NotificationSidebar({ open, onClose }: { open: boolean; onClose: (open: boolean) => void }) {
  const notifications = [
    { id: 1, title: 'New Order #1024', message: 'You have received a new order from Alice Smith.', time: '5m ago' },
    { id: 2, title: 'Project Update', message: 'The deployment for Q1 release has been completed successfully.', time: '1h ago' },
    { id: 3, title: 'New Component Available', message: 'We have added a new Table component to the library.', time: '2h ago' },
    { id: 4, title: 'Meeting Reminder', message: 'Team sync starting in 15 minutes.', time: '3h ago' },
    { id: 5, title: 'Welcome!', message: 'Thanks for joining our platform. Get started by setting up your profile.', time: '1d ago' },
  ]

  return (
    <Headless.Dialog open={open} onClose={onClose} className="relative z-50">
      <Headless.DialogBackdrop
        transition
        className="fixed inset-0 bg-zinc-900/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <Headless.DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl dark:bg-zinc-900 ring-1 ring-zinc-950/5 dark:ring-white/10">
                <div className="px-4 sm:px-6">
                  <div className="flex items-start justify-between">
                    <Heading level={2}>Notifications</Heading>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        className="relative rounded-md bg-transparent text-zinc-400 hover:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-zinc-400 dark:hover:text-zinc-300"
                        onClick={() => onClose(false)}
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                  <ul className="space-y-4">
                    {notifications.map((notification) => (
                      <li key={notification.id} className="relative rounded-lg border border-zinc-200 bg-zinc-50 p-4 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 transition">
                        <div className="flex justify-between items-start">
                            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
                            {notification.title}
                            </h3>
                            <span className="text-xs text-zinc-500 dark:text-zinc-400">{notification.time}</span>
                        </div>
                        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                          {notification.message}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Headless.DialogPanel>
          </div>
        </div>
      </div>
    </Headless.Dialog>
  )
}
