import { useEffect, useId, useRef, useState } from 'react';
import { siteNavigation, isNavigationItemCurrent } from '../../data/navigation';
import NavBrand from './NavBrand';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef(false);
  const panelId = useId();

  const closeMenu = (restoreFocus = false) => {
    restoreFocusRef.current = restoreFocus;
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) {
      if (restoreFocusRef.current) toggleRef.current?.focus();
      restoreFocusRef.current = false;
      return;
    }

    navRef.current?.querySelector<HTMLAnchorElement>('.nav-title')?.focus();

    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !navRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        restoreFocusRef.current = true;
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  return (
    <div
      ref={navRef}
      className={`navbar-container ${isOpen ? 'expanded' : 'collapsed'}`}
      onBlurCapture={(event) => {
        if (event.relatedTarget instanceof Node && !event.currentTarget.contains(event.relatedTarget)) {
          closeMenu();
        }
      }}
    >
      {!isOpen && (
        <button
          ref={toggleRef}
          type="button"
          className="toggle-button"
          aria-label="Open menu"
          aria-expanded={false}
          aria-controls={panelId}
          onClick={() => setIsOpen(true)}
        >
          <div className="menu-text menu-label">MENU</div>
          <div className="menu-open-icon">
            <svg aria-hidden="true" focusable="false" className="vector vector-1" width="18" height="36" viewBox="0 0 18 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 36.5L2 18.5732L17 1.5" stroke="var(--color-ink)" strokeWidth="2" />
            </svg>
            <svg aria-hidden="true" focusable="false" className="vector vector-2" width="13" height="36" viewBox="0 0 13 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 35.5L2 17.5732L12 0.499999" stroke="var(--color-ink)" strokeWidth="2" />
            </svg>
            <svg aria-hidden="true" focusable="false" className="vector vector-3" width="22" height="36" viewBox="0 0 22 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 36.5L2 18.5732L21 1.5" stroke="var(--color-ink)" strokeWidth="2" />
            </svg>

            <svg aria-hidden="true" focusable="false" className="vector vector-4" width="18" height="36" viewBox="0 0 18 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 36.5L2 18.5732L17 1.5" stroke="var(--color-ink)" strokeWidth="2" />
            </svg>

          </div>

        </button>
      )}
      {isOpen && (
        <div>
          <button
            type="button"
            className="toggle-button-close"
            aria-label="Close menu"
            aria-expanded={true}
            aria-controls={panelId}
            onClick={() => closeMenu(true)}
          >
            <div className="menu-close-icon">
              <svg aria-hidden="true" focusable="false" width="18" height="38" viewBox="0 0 18 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 36.5L16 18.5732L0.999996 1.5" stroke="var(--color-ink)" strokeWidth="2" />
              </svg>

            </div>

          </button>
          <nav
            id={panelId}
            className="navbar"
            aria-label="Main navigation"
            onClick={(event) => {
              if (event.target instanceof Element && event.target.closest('a[href]')) closeMenu();
            }}
          >
            <NavBrand />
            <div className="nav-buttons">
              {siteNavigation.map((item) => (
                <div className="nav-button-wrapper" key={item.href}>
                  <a
                    className="nav-button"
                    href={item.href}
                    aria-current={isNavigationItemCurrent(item, window.location.pathname) ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                </div>
              ))}
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
