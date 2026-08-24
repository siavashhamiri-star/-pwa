import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { TavanaCityProvider } from './context/TavanaCityContext';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { AccessibilityToolbar } from './components/accessibility/AccessibilityToolbar';
import { ScreenReaderAnnouncer } from './components/accessibility/ScreenReaderAnnouncer';
import { HomePage } from './features/home/HomePage';
import { BusinessListPage } from './features/businesses/BusinessListPage';
import { BusinessShowcaseModal } from './features/businesses/BusinessShowcaseModal';
import { RegisterBusinessModal } from './features/businesses/RegisterBusinessModal';
import { RoomsPage } from './features/rooms/RoomsPage';
import { LeaguesPage } from './features/leagues/LeaguesPage';
import { ReferralPage } from './features/referral/ReferralPage';
import { UserDashboardPage } from './features/dashboard/UserDashboardPage';
import { AdminPanelModal } from './features/admin/AdminPanelModal';
import { AuthModal } from './features/auth/AuthModal';
import { TermsDisclaimerModal } from './components/modals/TermsDisclaimerModal';
import { ArchitectureModal } from './components/modals/ArchitectureModal';
import { AutomationModal } from './components/modals/AutomationModal';
import { BusinessProfile } from './types';

function MainAppShell() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessProfile | null>(null);
  const [isRegisterBusinessOpen, setIsRegisterBusinessOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const [isArchitectureModalOpen, setIsArchitectureModalOpen] = useState<boolean>(false);
  const [isAutomationModalOpen, setIsAutomationModalOpen] = useState<boolean>(false);
  const [isDisclaimerModalOpen, setIsDisclaimerModalOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex flex-col font-sans selection:bg-indigo-500 selection:text-white" dir="rtl">
      {/* Accessibility Live Announcers */}
      <ScreenReaderAnnouncer />

      {/* Persistent App Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenRegisterBusiness={() => setIsRegisterBusinessOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
        onOpenArchitectureModal={() => setIsArchitectureModalOpen(true)}
        onOpenAutomationModal={() => setIsAutomationModalOpen(true)}
      />

      {/* Main Page Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8" id="main-content">
        {activeTab === 'home' && (
          <HomePage
            onNavigate={(tab) => setActiveTab(tab)}
            onSelectBusiness={(biz) => setSelectedBusiness(biz)}
            onOpenRegisterBusiness={() => setIsRegisterBusinessOpen(true)}
            onOpenArchitecture={() => setIsArchitectureModalOpen(true)}
            onOpenAutomation={() => setIsAutomationModalOpen(true)}
          />
        )}

        {activeTab === 'businesses' && (
          <BusinessListPage
            onSelectBusiness={(biz) => setSelectedBusiness(biz)}
            onOpenRegisterBusiness={() => setIsRegisterBusinessOpen(true)}
          />
        )}

        {activeTab === 'rooms' && <RoomsPage />}

        {activeTab === 'leagues' && <LeaguesPage />}

        {activeTab === 'referrals' && <ReferralPage />}

        {activeTab === 'dashboard' && (
          <UserDashboardPage
            onSelectBusiness={(biz) => setSelectedBusiness(biz)}
            onOpenRegisterBusiness={() => setIsRegisterBusinessOpen(true)}
            onOpenArchitectureModal={() => setIsArchitectureModalOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenDisclaimer={() => setIsDisclaimerModalOpen(true)}
        onOpenArchitecture={() => setIsArchitectureModalOpen(true)}
        onOpenAutomation={() => setIsAutomationModalOpen(true)}
      />

      {/* Floating Accessibility Controls */}
      <AccessibilityToolbar />

      {/* Global Modals */}
      <BusinessShowcaseModal
        business={selectedBusiness}
        isOpen={!!selectedBusiness}
        onClose={() => setSelectedBusiness(null)}
      />

      <RegisterBusinessModal
        isOpen={isRegisterBusinessOpen}
        onClose={() => setIsRegisterBusinessOpen(false)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <AdminPanelModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />

      <ArchitectureModal
        isOpen={isArchitectureModalOpen}
        onClose={() => setIsArchitectureModalOpen(false)}
      />

      <AutomationModal
        isOpen={isAutomationModalOpen}
        onClose={() => setIsAutomationModalOpen(false)}
      />

      <TermsDisclaimerModal
        isOpen={isDisclaimerModalOpen}
        onClose={() => setIsDisclaimerModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AccessibilityProvider>
      <AuthProvider>
        <TavanaCityProvider>
          <MainAppShell />
        </TavanaCityProvider>
      </AuthProvider>
    </AccessibilityProvider>
  );
}
