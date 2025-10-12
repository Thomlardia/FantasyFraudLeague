import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';

/**
 * PageHeader component - A flexible layout wrapper for page headers
 *
 * Simple usage (back button + title + controls):
 *   <PageHeader title="Defense Shop" backPath="/home">
 *     <MoneyBar />
 *   </PageHeader>
 *
 * Advanced usage (custom layout sections):
 *   <PageHeader
 *     leftContent={custom buttons}
 *     centerContent={<MoneyBar />}
 *   >
 *     right controls
 *   </PageHeader>
 *
 * @param {Object} props
 * @param {string} props.title - The page title (optional if using custom content)
 * @param {string} props.backPath - Path for the back button (default: "/home", optional if using custom content)
 * @param {React.ReactNode} props.leftContent - Custom left section content (overrides back button)
 * @param {React.ReactNode} props.centerContent - Custom center section content (overrides title)
 * @param {React.ReactNode} props.children - Right section controls (MoneyBar, filters, sorting, etc.)
 */
function PageHeader({
  title,
  backPath = "/home",
  leftContent,
  centerContent,
  children
}) {
  const { hasRole } = useAuth();

  return (
    <div className="page-header">
      {/* Left section: custom content OR back button */}
      <div className="page-header-left">
        {leftContent ? (
          leftContent
        ) : (
          <Link to={backPath} className="icon-button back-button" title="Back">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
        )}
      </div>

      {/* Center section: custom content OR title */}
      <div className="page-header-center">
        {centerContent ? (
          centerContent
        ) : (
          title && <h1 className="page-header-title">{title}</h1>
        )}
      </div>

      {/* Right section: custom content + admin button if applicable */}
      {(children || hasRole("admin")) && (
        <div className="page-header-right">
          {children}
          {hasRole("admin") && (
            <Link to="/admin" className="icon-button" title="Admin Dashboard">
              <span className="material-symbols-outlined">admin_panel_settings</span>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default PageHeader;
