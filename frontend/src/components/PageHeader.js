import React from 'react';
import { Link } from 'react-router-dom';

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

      {/* Right section: always custom via children */}
      {children && <div className="page-header-right">{children}</div>}
    </div>
  );
}

export default PageHeader;
