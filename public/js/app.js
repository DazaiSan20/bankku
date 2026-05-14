/**
 * Bankku - Banking Dashboard JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {

    // ============================
    // Page load fade-in animation
    // ============================
    document.body.style.opacity = '0';
    requestAnimationFrame(() => {
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '1';
    });

    // ============================
    // Auto-dismiss flash alerts
    // ============================
    document.querySelectorAll('.alert').forEach(alert => {
        setTimeout(() => {
            alert.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            alert.style.opacity   = '0';
            alert.style.transform = 'translateY(-10px)';
            setTimeout(() => alert.remove(), 300);
        }, 4000);
    });

    // ============================
    // Mobile sidebar toggle
    // ============================
    const sidebar        = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const menuToggle     = document.querySelector('.menu-toggle');

    function openSidebar() {
        sidebar?.classList.add('open');
        sidebarOverlay?.classList.add('visible');
        document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
        sidebar?.classList.remove('open');
        sidebarOverlay?.classList.remove('visible');
        document.body.style.overflow = '';
    }

    menuToggle?.addEventListener('click', () => {
        sidebar?.classList.contains('open') ? closeSidebar() : openSidebar();
    });

    sidebarOverlay?.addEventListener('click', closeSidebar);

    // Close sidebar on nav click (mobile/tablet)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 850) closeSidebar();
        });
    });

    // ============================
    // Smooth scroll for anchor links
    // ============================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ============================
    // Section block hover elevation
    // ============================
    document.querySelectorAll('.section-block').forEach(block => {
        block.addEventListener('mouseenter', () => {
            block.style.boxShadow = '0 4px 24px rgba(45, 96, 255, 0.08)';
        });
        block.addEventListener('mouseleave', () => {
            block.style.boxShadow = '';
        });
    });

    // ============================
    // Settings tab switching
    // ============================
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function (e) {
            // Only for JS-driven tabs (not server-side)
            if (this.tagName === 'A') return;
            e.preventDefault();
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // ============================
    // Filter buttons (Transactions)
    // ============================
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // ============================
    // Avatar preview on file select
    // ============================
    const avatarInput   = document.getElementById('avatarInput');
    const avatarPreview = document.getElementById('avatarPreview');
    if (avatarInput && avatarPreview) {
        avatarInput.addEventListener('change', () => {
            const file = avatarInput.files[0];
            if (file) {
                avatarPreview.src = URL.createObjectURL(file);
            }
        });
    }

    // ============================
    // Repay button confirmation
    // ============================
    document.querySelectorAll('.btn-repay').forEach(btn => {
        btn.addEventListener('click', function (e) {
            if (!this.form) return;
            if (!confirm('Confirm repayment for this loan?')) {
                e.preventDefault();
            }
        });
    });

    // ============================
    // Number counter animation
    // ============================
    function animateCounter(element, target, duration = 800) {
        const start    = 0;
        const step     = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased   = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            element.textContent = '$' + Math.round(start + (target - start) * eased).toLocaleString();
            if (progress < 1) requestAnimationFrame(step);
        };
        let startTime;
        requestAnimationFrame(step);
    }

    // Animate balance numbers on load
    document.querySelectorAll('.card-balance').forEach(el => {
        const raw = el.textContent.replace(/[^0-9]/g, '');
        if (raw) animateCounter(el, parseInt(raw));
    });

});
