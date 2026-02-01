'use client'

import { Button } from '@/components/button'
import { Heading, Subheading } from '@/components/heading'
import { Text } from '@/components/text'
import { Link } from '@/components/link'
import { Logo } from './logo'
import { 
  BuildingStorefrontIcon, 
  ChatBubbleLeftRightIcon, 
  GlobeAmericasIcon,
  InboxStackIcon,
  CheckIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/react/24/outline'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

export default function LandingPage() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const intl = useIntl()

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && resolvedTheme === 'dark'

  const features = [
    {
      name: intl.formatMessage({ id: 'landing_feature_listings_title' }),
      description: intl.formatMessage({ id: 'landing_feature_listings_desc' }),
      icon: BuildingStorefrontIcon,
    },
    {
      name: intl.formatMessage({ id: 'landing_feature_marketplaces_title' }),
      description: intl.formatMessage({ id: 'landing_feature_marketplaces_desc' }),
      icon: GlobeAmericasIcon,
    },
    {
      name: intl.formatMessage({ id: 'landing_feature_inbox_title' }),
      description: intl.formatMessage({ id: 'landing_feature_inbox_desc' }),
      icon: ChatBubbleLeftRightIcon,
    },
    {
      name: intl.formatMessage({ id: 'landing_feature_inventory_title' }),
      description: intl.formatMessage({ id: 'landing_feature_inventory_desc' }),
      icon: InboxStackIcon,
    },
  ]

  const howItWorksSteps = [
    { step: intl.formatMessage({ id: 'landing_step_01' }), title: intl.formatMessage({ id: 'landing_step_01_title' }), description: intl.formatMessage({ id: 'landing_step_01_desc' }), color: 'from-blue-500 to-cyan-500' },
    { step: intl.formatMessage({ id: 'landing_step_02' }), title: intl.formatMessage({ id: 'landing_step_02_title' }), description: intl.formatMessage({ id: 'landing_step_02_desc' }), color: 'from-purple-500 to-pink-500' },
    { step: intl.formatMessage({ id: 'landing_step_03' }), title: intl.formatMessage({ id: 'landing_step_03_title' }), description: intl.formatMessage({ id: 'landing_step_03_desc' }), color: 'from-orange-500 to-red-500' },
  ]

  const stats = [
    { value: '50K+', label: intl.formatMessage({ id: 'landing_stats_active_sellers' }) },
    { value: '2M+', label: intl.formatMessage({ id: 'landing_stats_products_listed' }) },
    { value: '99.9%', label: intl.formatMessage({ id: 'landing_stats_uptime' }) },
    { value: '4.9★', label: intl.formatMessage({ id: 'landing_stats_avg_rating' }) },
  ]

  const testimonials = [
    { name: 'Sarah Chen', role: 'Vintage Reseller', quote: 'Catalyst cut my listing time in half. I can now manage 5 marketplaces from one place!', avatar: '/users/erica.jpg' },
    { name: 'Marcus Johnson', role: 'Electronics Store Owner', quote: 'The unified inbox is a game-changer. No more missing customer messages.', avatar: '/users/erica.jpg' },
    { name: 'Emily Rodriguez', role: 'Handmade Crafts', quote: 'Finally, inventory that actually syncs! No more overselling or disappointed customers.', avatar: '/users/erica.jpg' },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-zinc-900 transition-colors duration-200">
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 lg:px-8 border-b border-zinc-100 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Logo className="h-8 w-auto text-blue-600 dark:text-blue-500" />
          <Text className="font-bold text-xl hidden sm:block tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"></Text>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Toggle theme"
          >
            {mounted && (isDark ? <SunIcon className="h-5 w-5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200" /> : <MoonIcon className="h-5 w-5 text-zinc-400 hover:text-zinc-600" />)}
          </button>
          <Link href="/login" className="text-sm font-semibold text-zinc-900 dark:text-white hover:text-zinc-600 dark:hover:text-zinc-300">
             <FormattedMessage id="menu_log_in" />
          </Link>
          <Link href="/register">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full px-6 py-2 text-sm font-semibold shadow-lg hover:shadow-xl transition-all"><FormattedMessage id="menu_get_started" /></button>
          </Link>
        </div>
      </header>
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative isolate px-6 pt-14 lg:px-8 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800 overflow-hidden">
          {/* Background gradient blobs */}
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob dark:opacity-10"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000 dark:opacity-10"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000 dark:opacity-10"></div>
          
          <div className="mx-auto max-w-3xl py-24 sm:py-32 lg:py-40 text-center relative z-10">
            <div className="mb-8 flex justify-center">
                <span className="rounded-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 px-4 py-1.5 text-sm font-semibold leading-6 text-blue-600 ring-1 ring-inset ring-blue-600/20 dark:text-blue-400 dark:ring-blue-400/20 backdrop-blur-sm">
                    <FormattedMessage id="landing_hero_badge" />
                </span>
            </div>
            <Heading level={1} className="text-5xl font-extrabold tracking-tight sm:text-7xl mb-6">
              <FormattedMessage id="landing_hero_title" /> <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"><FormattedMessage id="landing_hero_title_highlight" /></span>
            </Heading>
            <Text className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              <FormattedMessage id="landing_hero_subtitle" />
            </Text>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/register">
                <button className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-8 py-3 text-base rounded-full shadow-lg hover:shadow-xl transition-all font-semibold"><FormattedMessage id="landing_hero_cta" /></button>
              </Link>
              <Link href="#features" className="text-sm font-semibold leading-6 text-zinc-900 dark:text-white flex items-center gap-1 group">
                <FormattedMessage id="landing_hero_cta_secondary" /> <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
            <div className="relative rounded-xl bg-zinc-900/5 p-2 ring-1 ring-inset ring-zinc-900/10 lg:-m-4 lg:rounded-2xl lg:p-4 dark:bg-white/5 dark:ring-white/10 mt-16 flow-root sm:mt-24">
                <div className="rounded-md bg-white shadow-2xl ring-1 ring-zinc-900/10 dark:bg-zinc-900 dark:ring-white/10 overflow-hidden relative aspect-[16/10] flex flex-col">
                    {/* Mock Window Header */}
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>
                        <div className="mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-md px-3 py-1 text-[10px] text-zinc-400 flex items-center gap-2 min-w-[200px] justify-center shadow-sm">
                            <span className="opacity-50">🔒</span> catalyst.com/dashboard
                        </div>
                    </div>
                    
                    {/* Mock App Body */}
                    <div className="flex flex-1 overflow-hidden bg-zinc-50 dark:bg-zinc-950">
                        {/* Mock Sidebar */}
                        <div className="hidden sm:flex w-48 flex-col border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 pt-5 pb-4">
                            <div className="flex items-center gap-3 px-4 mb-6">
                                <div className="h-6 w-6 rounded bg-blue-600"></div>
                                <div className="h-2 w-20 rounded bg-zinc-200 dark:bg-zinc-700"></div>
                            </div>
                            <div className="space-y-1 px-2">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className={`flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium ${i === 1 ? 'bg-zinc-100 text-blue-600 dark:bg-zinc-800 dark:text-blue-400' : 'text-zinc-600 dark:text-zinc-400'}`}>
                                        <div className={`h-4 w-4 rounded ${i === 1 ? 'bg-blue-600' : 'bg-zinc-300 dark:bg-zinc-600'}`}></div>
                                        <div className={`h-2 rounded ${i === 1 ? 'w-16 bg-blue-600/30' : 'w-24 bg-zinc-200 dark:bg-zinc-700'}`}></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {/* Mock Content */}
                        <div className="flex-1 p-6 sm:p-8 overflow-hidden">
                            <div className="flex items-center justify-between mb-8">
                                <div className="space-y-2">
                                    <div className="h-6 w-32 rounded bg-zinc-900 dark:bg-zinc-100"></div>
                                    <div className="h-4 w-48 rounded bg-zinc-300 dark:bg-zinc-600"></div>
                                </div>
                                <div className="h-8 w-24 rounded bg-blue-600 shadow-sm"></div>
                            </div>
                            
                            {/* Mock Stats */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-sm">
                                         <div className="flex items-center gap-2 mb-2">
                                            <div className="h-2 w-16 rounded bg-zinc-200 dark:bg-zinc-700"></div>
                                         </div>
                                         <div className="h-6 w-24 rounded bg-zinc-900 dark:bg-zinc-100 mb-1"></div>
                                         <div className="h-3 w-12 rounded bg-green-500/20 text-green-700 dark:text-green-400 text-[10px] flex items-center justify-center">+12.5%</div>
                                    </div>
                                ))}
                            </div>
                            
                             {/* Mock Table */}
                            <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">
                                <div className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 px-4 py-3">
                                     <div className="h-4 w-32 rounded bg-zinc-300 dark:bg-zinc-600"></div>
                                </div>
                                <div className="p-4 space-y-4">
                                     {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                 <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-700"></div>
                                                 <div className="space-y-1">
                                                     <div className="h-3 w-24 rounded bg-zinc-800 dark:bg-zinc-200"></div>
                                                     <div className="h-2 w-16 rounded bg-zinc-300 dark:bg-zinc-600"></div>
                                                 </div>
                                            </div>
                                            <div className="h-4 w-12 rounded bg-zinc-200 dark:bg-zinc-700"></div>
                                        </div>
                                     ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>

        {/* Value Prop Section */}
        <div className="bg-white dark:bg-zinc-900 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <Heading level={2} className="text-3xl font-bold tracking-tight sm:text-4xl text-zinc-900 dark:text-white">
                 <FormattedMessage id="landing_value_title" />
              </Heading>
              <Text className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                <FormattedMessage id="landing_value_subtitle" />
              </Text>
            </div>
            
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-zinc-50 dark:bg-zinc-800/30 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <Subheading className="text-blue-600 dark:text-blue-400 font-semibold"><FormattedMessage id="landing_how_it_works_label" /></Subheading>
              <Heading level={2} className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"><FormattedMessage id="landing_how_it_works_title" /></Heading>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: '01', title: intl.formatMessage({ id: 'landing_step_1_title' }), description: intl.formatMessage({ id: 'landing_step_1_description' }), color: 'from-blue-500 to-cyan-500' },
                { step: '02', title: intl.formatMessage({ id: 'landing_step_2_title' }), description: intl.formatMessage({ id: 'landing_step_2_description' }), color: 'from-purple-500 to-pink-500' },
                { step: '03', title: intl.formatMessage({ id: 'landing_step_3_title' }), description: intl.formatMessage({ id: 'landing_step_3_description' }), color: 'from-orange-500 to-red-500' },
              ].map((item) => (
                <div key={item.step} className="relative group">
                  <div className={`absolute -inset-1 bg-gradient-to-r ${item.color} rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300`}></div>
                  <div className="relative bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-sm ring-1 ring-zinc-900/5 dark:ring-white/10 h-full">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${item.color} text-white font-bold text-lg mb-6`}>
                      {item.step}
                    </div>
                    <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">{item.title}</h3>
                    <p className="text-zinc-600 dark:text-zinc-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white dark:bg-zinc-900 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {[
                { value: intl.formatMessage({ id: 'landing_stat_1_value' }), label: intl.formatMessage({ id: 'landing_stat_1_label' }) },
                { value: intl.formatMessage({ id: 'landing_stat_2_value' }), label: intl.formatMessage({ id: 'landing_stat_2_label' }) },
                { value: intl.formatMessage({ id: 'landing_stat_3_value' }), label: intl.formatMessage({ id: 'landing_stat_3_label' }) },
                { value: intl.formatMessage({ id: 'landing_stat_4_value' }), label: intl.formatMessage({ id: 'landing_stat_4_label' }) },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl sm:text-5xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</div>
                  <div className="mt-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="bg-zinc-50 dark:bg-zinc-800/30 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <Subheading className="text-blue-600 dark:text-blue-400 font-semibold"><FormattedMessage id="landing_testimonials_label" /></Subheading>
              <Heading level={2} className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"><FormattedMessage id="landing_testimonials_title" /></Heading>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: intl.formatMessage({ id: 'landing_testimonial_1_name' }), role: intl.formatMessage({ id: 'landing_testimonial_1_role' }), quote: intl.formatMessage({ id: 'landing_testimonial_1_quote' }), avatar: '/users/erica.jpg' },
                { name: intl.formatMessage({ id: 'landing_testimonial_2_name' }), role: intl.formatMessage({ id: 'landing_testimonial_2_role' }), quote: intl.formatMessage({ id: 'landing_testimonial_2_quote' }), avatar: '/users/erica.jpg' },
                { name: intl.formatMessage({ id: 'landing_testimonial_3_name' }), role: intl.formatMessage({ id: 'landing_testimonial_3_role' }), quote: intl.formatMessage({ id: 'landing_testimonial_3_quote' }), avatar: '/users/erica.jpg' },
              ].map((testimonial) => (
                <div key={testimonial.name} className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-sm ring-1 ring-zinc-900/5 dark:ring-white/10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-zinc-900 dark:text-white">{testimonial.name}</div>
                      <div className="text-sm text-zinc-500 dark:text-zinc-400">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 italic">"{testimonial.quote}"</p>
                  <div className="mt-4 flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div id="features" className="bg-zinc-50 dark:bg-zinc-800/50 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <Subheading level={2} className="text-blue-600 dark:text-blue-400 font-semibold"><FormattedMessage id="landing_features_label" /></Subheading>
                    <Heading level={2} className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"><FormattedMessage id="landing_features_title" /></Heading>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                        {features.map((feature) => (
                        <div key={feature.name} className="flex flex-col bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-sm ring-1 ring-zinc-900/5 dark:ring-white/10">
                            <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-zinc-900 dark:text-white mb-4">
                            <feature.icon className="h-8 w-8 flex-none text-blue-600 dark:text-blue-400" aria-hidden="true" />
                            {feature.name}
                            </dt>
                            <dd className="flex flex-auto flex-col text-base leading-7 text-zinc-600 dark:text-zinc-400">
                            <p className="flex-auto">{feature.description}</p>
                            <p className="mt-6">
                                <Link href="#" className="text-sm font-semibold leading-6 text-blue-600 dark:text-blue-400 hover:underline">
                                <FormattedMessage id="landing_features_learn_more" /> <span aria-hidden="true">→</span>
                                </Link>
                            </p>
                            </dd>
                        </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>

        {/* Pricing Section */}
        <div id="pricing" className="bg-white dark:bg-zinc-900 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <Subheading className="text-blue-600 dark:text-blue-400 font-semibold"><FormattedMessage id="landing_pricing_label" /></Subheading>
              <Heading level={2} className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
                <FormattedMessage id="landing_pricing_title" />
              </Heading>
              <Text className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                <FormattedMessage id="landing_pricing_subtitle" />
              </Text>
            </div>
            <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
              {/* Free Plan */}
              <div className="flex flex-col justify-between rounded-3xl bg-white dark:bg-zinc-800/50 p-8 ring-1 ring-zinc-200 dark:ring-zinc-700 xl:p-10">
                <div>
                  <div className="flex items-center justify-between gap-x-4">
                    <h3 className="text-lg font-semibold leading-8 text-zinc-900 dark:text-white"><FormattedMessage id="landing_pricing_free_name" /></h3>
                    <span className="rounded-full bg-green-100 dark:bg-green-900/30 px-2.5 py-1 text-xs font-semibold leading-5 text-green-600 dark:text-green-400">
                      <FormattedMessage id="landing_pricing_free_badge" />
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                    <FormattedMessage id="landing_pricing_free_description" />
                  </p>
                  <p className="mt-6 flex items-baseline gap-x-1">
                    <span className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white"><FormattedMessage id="landing_pricing_free_price" /></span>
                    <span className="text-sm font-semibold leading-6 text-zinc-600 dark:text-zinc-400"><FormattedMessage id="landing_pricing_free_period" /></span>
                  </p>
                  <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                    <li className="flex gap-x-3">
                      <CheckIcon className="h-6 w-5 flex-none text-blue-600 dark:text-blue-400" aria-hidden="true" />
                      <FormattedMessage id="landing_pricing_free_feature_1" />
                    </li>
                    <li className="flex gap-x-3">
                      <CheckIcon className="h-6 w-5 flex-none text-blue-600 dark:text-blue-400" aria-hidden="true" />
                      <FormattedMessage id="landing_pricing_free_feature_2" />
                    </li>
                    <li className="flex gap-x-3">
                      <CheckIcon className="h-6 w-5 flex-none text-blue-600 dark:text-blue-400" aria-hidden="true" />
                      <FormattedMessage id="landing_pricing_free_feature_3" />
                    </li>
                    <li className="flex gap-x-3">
                      <CheckIcon className="h-6 w-5 flex-none text-blue-600 dark:text-blue-400" aria-hidden="true" />
                      <FormattedMessage id="landing_pricing_free_feature_4" />
                    </li>
                  </ul>
                </div>
                <Link href="/register" className="mt-8">
                  <button className="w-full rounded-full bg-zinc-100 dark:bg-zinc-700 px-3 py-2 text-center text-sm font-semibold leading-6 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors">
                    <FormattedMessage id="landing_pricing_free_cta" />
                  </button>
                </Link>
              </div>

              {/* Basic Plan */}
              <div className="flex flex-col justify-between rounded-3xl bg-white dark:bg-zinc-800/50 p-8 ring-1 ring-zinc-200 dark:ring-zinc-700 xl:p-10">
                <div>
                  <div className="flex items-center justify-between gap-x-4">
                    <h3 className="text-lg font-semibold leading-8 text-zinc-900 dark:text-white"><FormattedMessage id="landing_pricing_basic_name" /></h3>
                    <span className="rounded-full bg-blue-100 dark:bg-blue-900/30 px-2.5 py-1 text-xs font-semibold leading-5 text-blue-600 dark:text-blue-400">
                      <FormattedMessage id="landing_pricing_basic_badge" />
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                    <FormattedMessage id="landing_pricing_basic_description" />
                  </p>
                  <p className="mt-6 flex items-baseline gap-x-1">
                    <span className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white"><FormattedMessage id="landing_pricing_basic_price" /></span>
                    <span className="text-sm font-semibold leading-6 text-zinc-600 dark:text-zinc-400"><FormattedMessage id="landing_pricing_basic_period" /></span>
                  </p>
                  <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                    <li className="flex gap-x-3">
                      <CheckIcon className="h-6 w-5 flex-none text-blue-600 dark:text-blue-400" aria-hidden="true" />
                      <FormattedMessage id="landing_pricing_basic_feature_1" />
                    </li>
                    <li className="flex gap-x-3">
                      <CheckIcon className="h-6 w-5 flex-none text-blue-600 dark:text-blue-400" aria-hidden="true" />
                      <FormattedMessage id="landing_pricing_basic_feature_2" />
                    </li>
                    <li className="flex gap-x-3">
                      <CheckIcon className="h-6 w-5 flex-none text-blue-600 dark:text-blue-400" aria-hidden="true" />
                      <FormattedMessage id="landing_pricing_basic_feature_3" />
                    </li>
                    <li className="flex gap-x-3">
                      <CheckIcon className="h-6 w-5 flex-none text-blue-600 dark:text-blue-400" aria-hidden="true" />
                      <FormattedMessage id="landing_pricing_basic_feature_4" />
                    </li>
                    <li className="flex gap-x-3">
                      <CheckIcon className="h-6 w-5 flex-none text-blue-600 dark:text-blue-400" aria-hidden="true" />
                      <FormattedMessage id="landing_pricing_basic_feature_5" />
                    </li>
                  </ul>
                </div>
                <Link href="/register" className="mt-8">
                  <button className="w-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-3 py-2 text-center text-sm font-semibold leading-6 text-white shadow-lg hover:shadow-xl transition-all">
                    <FormattedMessage id="landing_pricing_basic_cta" />
                  </button>
                </Link>
              </div>

              {/* Pro Plan */}
              <div className="relative flex flex-col justify-between rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 p-8 xl:p-10 shadow-xl">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-gradient-to-r from-orange-500 to-pink-500 px-4 py-1 text-xs font-bold text-white shadow-lg">
                    <FormattedMessage id="landing_pricing_pro_badge" />
                  </span>
                </div>
                <div>
                  <div className="flex items-center justify-between gap-x-4">
                    <h3 className="text-lg font-semibold leading-8 text-white"><FormattedMessage id="landing_pricing_pro_name" /></h3>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-blue-100">
                    <FormattedMessage id="landing_pricing_pro_description" />
                  </p>
                  <p className="mt-6 flex items-baseline gap-x-1">
                    <span className="text-4xl font-bold tracking-tight text-white"><FormattedMessage id="landing_pricing_pro_price" /></span>
                    <span className="text-sm font-semibold leading-6 text-blue-200"><FormattedMessage id="landing_pricing_pro_period" /></span>
                  </p>
                  <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-blue-100">
                    <li className="flex gap-x-3">
                      <CheckIcon className="h-6 w-5 flex-none text-white" aria-hidden="true" />
                      <FormattedMessage id="landing_pricing_pro_feature_1" />
                    </li>
                    <li className="flex gap-x-3">
                      <CheckIcon className="h-6 w-5 flex-none text-white" aria-hidden="true" />
                      <FormattedMessage id="landing_pricing_pro_feature_2" />
                    </li>
                    <li className="flex gap-x-3">
                      <CheckIcon className="h-6 w-5 flex-none text-white" aria-hidden="true" />
                      <FormattedMessage id="landing_pricing_pro_feature_3" />
                    </li>
                    <li className="flex gap-x-3">
                      <CheckIcon className="h-6 w-5 flex-none text-white" aria-hidden="true" />
                      <FormattedMessage id="landing_pricing_pro_feature_4" />
                    </li>
                    <li className="flex gap-x-3">
                      <CheckIcon className="h-6 w-5 flex-none text-white" aria-hidden="true" />
                      <FormattedMessage id="landing_pricing_pro_feature_5" />
                    </li>
                    <li className="flex gap-x-3">
                      <CheckIcon className="h-6 w-5 flex-none text-white" aria-hidden="true" />
                      <FormattedMessage id="landing_pricing_pro_feature_6" />
                    </li>
                  </ul>
                </div>
                <Link href="/register" className="mt-8">
                  <button className="w-full rounded-full bg-white px-3 py-2 text-center text-sm font-semibold leading-6 text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all">
                    <FormattedMessage id="landing_pricing_pro_cta" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div id="contact" className="bg-zinc-50 dark:bg-zinc-800/20 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <Subheading className="text-blue-600 dark:text-blue-400 font-semibold">Contact us</Subheading>
                    <Heading level={2} className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
                        Get in touch
                    </Heading>
                    <Text className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                        Have questions? We’d love to hear from you.
                    </Text>
                </div>
                <div className="mx-auto mt-16 max-w-xl sm:mt-20">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                             <div className="flex flex-col items-center justify-center p-8 bg-white dark:bg-zinc-900 rounded-xl shadow-sm ring-1 ring-zinc-900/5 dark:ring-white/10 text-center">
                                 <ChatBubbleLeftRightIcon className="h-10 w-10 text-blue-600 dark:text-blue-400 mb-4" />
                                 <h3 className="text-base font-semibold leading-7 text-zinc-900 dark:text-white">Sales Support</h3>
                                 <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                                     Need help picking a plan? Our team can help you find the best solution for your business.
                                 </p>
                                 <Link href="mailto:sales@catalyst.com" className="mt-4 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                                     sales@catalyst.com
                                 </Link>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        {/* Pricing/CTA Section */}
        <div className="bg-blue-600 dark:bg-blue-900 py-24 sm:py-32 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-950"></div>
            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 text-center">
                <Heading level={2} className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    <FormattedMessage id="landing_cta_title" />
                </Heading>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link href="/register">
                        <button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-2.5 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all">
                            <FormattedMessage id="landing_cta_button" />
                        </button>
                    </Link>
                    <Link href="#pricing" className="text-sm font-semibold leading-6 text-white flex items-center gap-1">
                        <FormattedMessage id="landing_cta_pricing" /> <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </div>
        </div>

      </main>

      <footer className="bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800">
        <div className="mx-auto max-w-7xl px-6 py-12 flex items-center justify-center lg:px-8">
          <div className="flex items-center justify-center gap-2">
            <Logo className="h-6 w-auto text-zinc-400" />
            <Text className="text-xs text-zinc-400"><FormattedMessage id="landing_footer_copyright" /></Text>
          </div>
        </div>
      </footer>
    </div>
  )
}
