'use client'

import { Badge } from '@/components/badge'
import { BellIcon, MoonIcon, SunIcon } from '@heroicons/react/20/solid'
import { useState, useEffect } from 'react'
import { NotificationSidebar } from '@/components/notification-sidebar'
import { useTheme } from 'next-themes'
import { FormattedMessage, useIntl } from 'react-intl'
import { Avatar } from '@/components/avatar'
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from '@/components/dropdown'
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from '@/components/navbar'
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarHeading,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from '@/components/sidebar'
import { SidebarLayout } from '@/components/sidebar-layout'
import { logout } from '@/app/actions/auth'
import { getEvents } from '@/data'
import {
  ArrowRightStartOnRectangleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Cog8ToothIcon,
  LightBulbIcon,
  PlusIcon,
  ShieldCheckIcon,
  UserCircleIcon,
} from '@heroicons/react/16/solid'
import { ModeProvider, useMode } from '@/components/mode-provider'
import {
  BanknotesIcon,
  CreditCardIcon,
  GlobeAltIcon,
  RectangleStackIcon,
  ShoppingCartIcon,
  TagIcon,
  TruckIcon,
  UserGroupIcon,
  ArrowsRightLeftIcon,
  HomeIcon,
  TicketIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/20/solid'
import { usePathname, useRouter } from 'next/navigation'

function ThemeToggleButton() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      type="button"
      className="p-2 text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      {isDark ? <SunIcon className="size-5" /> : <MoonIcon className="size-5" />}
    </button>
  )
}

function AccountDropdownMenu({ anchor }: { anchor: 'top start' | 'bottom end' }) {
  return (
    <DropdownMenu className="min-w-64" anchor={anchor}>
      <DropdownItem href="#">
        <UserCircleIcon />
        <DropdownLabel><FormattedMessage id="menu_my_account" /></DropdownLabel>
      </DropdownItem>
      <DropdownItem href="/settings">
        <Cog8ToothIcon />
        <DropdownLabel><FormattedMessage id="menu_settings" /></DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem href="#">
        <ShieldCheckIcon />
        <DropdownLabel><FormattedMessage id="menu_privacy_policy" /></DropdownLabel>
      </DropdownItem>
      <DropdownItem href="#">
        <LightBulbIcon />
        <DropdownLabel><FormattedMessage id="menu_share_feedback" /></DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem onClick={() => logout()}>
        <ArrowRightStartOnRectangleIcon />
        <DropdownLabel><FormattedMessage id="menu_sign_out" /></DropdownLabel>
      </DropdownItem>
    </DropdownMenu>
  )
}

function ApplicationLayoutContent({
  children,
}: {
  children: React.ReactNode
}) {
  let pathname = usePathname()
  let router = useRouter()
  const { isSellerMode, toggleMode } = useMode()
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)

  const handleToggleMode = () => {
    const nextIsSeller = !isSellerMode
    
    if (nextIsSeller) {
        // Checking if current route is valid for Seller
        const isAllowed = ['/admin', '/support', '/settings'].some(p => pathname.startsWith(p))
        if (!isAllowed) {
             router.push('/admin/dashboard')
        }
    } else {
        // Checking if current route is valid for Buyer
        const isAllowed = ['/dashboard', '/products', '/cart', '/subscription', '/orders', '/tracking', '/transactions', '/support', '/settings'].some(p => pathname.startsWith(p))
        if (!isAllowed) {
            router.push('/dashboard')
        }
    }
    toggleMode()
  }

  // Mock counts
  const counts = {
    notifications: 5,
    cart: 2,
    subscriptions: 1,
    orders: 4,
    tracking: 1,
  }

  return (
    <>
      <NotificationSidebar open={isNotificationOpen} onClose={setIsNotificationOpen} />
      <SidebarLayout
        navbar={
          <Navbar>
            <NavbarSpacer />
            <NavbarSection>
              <NavbarItem onClick={() => setIsNotificationOpen(true)} aria-label="Notifications">
                 <div className="relative" data-slot="icon">
                    <BellIcon className='size-full'/>
                    {counts.notifications > 0 && <Badge color="red" className="absolute -top-2 -right-2 size-4 p-0 flex items-center justify-center rounded-full text-[10px] ring-2 ring-white dark:ring-zinc-900">{counts.notifications}</Badge>}
                 </div>
              </NavbarItem>
              <Dropdown>
                <DropdownButton as={NavbarItem}>
                  <Avatar src="/users/erica.jpg" square />
                </DropdownButton>
                <AccountDropdownMenu anchor="bottom end" />
              </Dropdown>
            </NavbarSection>
          </Navbar>
        }
      sidebar={
        <Sidebar>
          <SidebarHeader>
             <SidebarItem>
                <Avatar src="/teams/catalyst.svg" />
                <SidebarLabel>Catalyst</SidebarLabel>
              </SidebarItem>
          </SidebarHeader>

          <SidebarBody>
            <SidebarSection>
              {isSellerMode ? (
                <>
                  <SidebarItem href="/admin/dashboard" current={pathname === '/admin/dashboard'}>
                    <HomeIcon />
                    <SidebarLabel><FormattedMessage id="menu_seller_dashboard" /></SidebarLabel>
                  </SidebarItem>
                  <SidebarItem href="/admin/products" current={pathname === '/admin/products'}>
                    <TagIcon />
                    <SidebarLabel><FormattedMessage id="menu_my_products" /></SidebarLabel>
                  </SidebarItem>
                   <SidebarItem href="/admin/orders" current={pathname === '/admin/orders'}>
                    <TicketIcon />
                    <SidebarLabel><FormattedMessage id="menu_sales_orders" /></SidebarLabel>
                  </SidebarItem>
                </>
              ) : (
                <>
                  <SidebarItem href="/dashboard" current={pathname === '/dashboard'}>
                    <HomeIcon />
                    <SidebarLabel><FormattedMessage id="menu_dashboard" /></SidebarLabel>
                  </SidebarItem>
                  <SidebarItem href="/products" current={pathname === '/products'}>
                    <GlobeAltIcon />
                    <SidebarLabel><FormattedMessage id="menu_products" /></SidebarLabel>
                  </SidebarItem>
                   <SidebarItem href="/cart" current={pathname === '/cart'}>
                     <div className="relative" data-slot="icon">
                        <ShoppingCartIcon className='size-full' />
                        {counts.cart > 0 && <Badge color="red" className="absolute -top-2 -right-2 size-4 p-0 flex items-center justify-center rounded-full text-[10px] ring-2 ring-white dark:ring-zinc-950">{counts.cart}</Badge>}
                     </div>
                    <SidebarLabel><FormattedMessage id="menu_cart" /></SidebarLabel>
                  </SidebarItem>
                   <SidebarItem href="/subscription" current={pathname === '/subscription'}>
                    <div className="relative" data-slot="icon">
                        <RectangleStackIcon className='size-full' />
                        {counts.subscriptions > 0 && <Badge color="red" className="absolute -top-2 -right-2 size-4 p-0 flex items-center justify-center rounded-full text-[10px] ring-2 ring-white dark:ring-zinc-950">{counts.subscriptions}</Badge>}
                     </div>
                    <SidebarLabel><FormattedMessage id="menu_subscriptions" /></SidebarLabel>
                  </SidebarItem>
                  <SidebarItem href="/orders" current={pathname === '/orders'}>
                    <div className="relative" data-slot="icon">
                        <TicketIcon className='size-full' />
                          {counts.orders > 0 && <Badge color="red" className="absolute -top-2 -right-2 size-4 p-0 flex items-center justify-center rounded-full text-[10px] ring-2 ring-white dark:ring-zinc-950">{counts.orders}</Badge>}
                     </div>
                    <SidebarLabel><FormattedMessage id="menu_my_orders" /></SidebarLabel>
                  </SidebarItem>
                   <SidebarItem href="/tracking" current={pathname === '/tracking'}>
                    <div className="relative" data-slot="icon">
                        <TruckIcon className='size-full' />
                        {counts.tracking > 0 && <Badge color="red" className="absolute -top-2 -right-2 size-4 p-0 flex items-center justify-center rounded-full text-[10px] ring-2 ring-white dark:ring-zinc-950">{counts.tracking}</Badge>}
                     </div>
                    <SidebarLabel><FormattedMessage id="menu_order_tracking" /></SidebarLabel>
                  </SidebarItem>
                   <SidebarItem href="/transactions" current={pathname === '/transactions'}>
                    <BanknotesIcon />
                    <SidebarLabel><FormattedMessage id="menu_transactions" /></SidebarLabel>
                  </SidebarItem>
                </>
              )}
                 <SidebarItem href="/support" current={pathname.startsWith('/support')}>
                <QuestionMarkCircleIcon />
                <SidebarLabel><FormattedMessage id="menu_support" /></SidebarLabel>
              </SidebarItem>
            </SidebarSection>
            
            <SidebarSpacer />

            <SidebarSection>
               <SidebarItem onClick={handleToggleMode}>
                <ArrowsRightLeftIcon />
                <SidebarLabel><FormattedMessage id={isSellerMode ? 'menu_switch_to_buying' : 'menu_switch_to_selling'} /></SidebarLabel>
              </SidebarItem>
            </SidebarSection>
          </SidebarBody>

          <SidebarFooter className="max-lg:hidden">
            <Dropdown>
              <DropdownButton as={SidebarItem}>
                <span className="flex min-w-0 items-center gap-3">
                  <Avatar src="/users/erica.jpg" className="size-10" square alt="" />
                  <span className="min-w-0">
                    <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">Erica</span>
                    <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                      erica@example.com
                    </span>
                  </span>
                </span>
                <ChevronUpIcon />
              </DropdownButton>
              <AccountDropdownMenu anchor="top start" />
            </Dropdown>
          </SidebarFooter>
        </Sidebar>
      }
    >
        <div className="absolute top-5 right-5 z-50 flex items-center gap-3 max-lg:hidden">
             <ThemeToggleButton />
             <button
                type="button"
                className="relative p-2 text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                onClick={() => setIsNotificationOpen(true)}
             >
                <div className="relative">
                    <BellIcon className='size-6'/>
                    {counts.notifications > 0 && <Badge color="red" className="absolute -top-2 -right-2 size-4 p-0 flex items-center justify-center rounded-full text-[10px] ring-2 ring-white dark:ring-zinc-900">{counts.notifications}</Badge>}
                 </div>
             </button>
        </div>
      {children}
    </SidebarLayout>
    </>
  )
}

export function ApplicationLayout(props: React.ComponentProps<typeof ApplicationLayoutContent>) {
  return (
    <ModeProvider>
      <ApplicationLayoutContent {...props} />
    </ModeProvider>
  )
}
