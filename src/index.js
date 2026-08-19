/* global atob */

const ISO_COUNTRY_CODES = [
    'AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'AM', 'AO', 'AQ', 'AR', 'AS', 'AT', 'AU', 'AW', 'AX', 'AZ',
    'BA', 'BB', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BL', 'BM', 'BN', 'BO', 'BQ', 'BR', 'BS',
    'BT', 'BV', 'BW', 'BY', 'BZ', 'CA', 'CC', 'CD', 'CF', 'CG', 'CH', 'CI', 'CK', 'CL', 'CM', 'CN',
    'CO', 'CR', 'CU', 'CV', 'CW', 'CX', 'CY', 'CZ', 'DE', 'DJ', 'DK', 'DM', 'DO', 'DZ', 'EC', 'EE',
    'EG', 'EH', 'ER', 'ES', 'ET', 'FI', 'FJ', 'FK', 'FM', 'FO', 'FR', 'GA', 'GB', 'GD', 'GE', 'GF',
    'GG', 'GH', 'GI', 'GL', 'GM', 'GN', 'GP', 'GQ', 'GR', 'GS', 'GT', 'GU', 'GW', 'GY', 'HK', 'HM',
    'HN', 'HR', 'HT', 'HU', 'ID', 'IE', 'IL', 'IM', 'IN', 'IO', 'IQ', 'IR', 'IS', 'IT', 'JE', 'JM',
    'JO', 'JP', 'KE', 'KG', 'KH', 'KI', 'KM', 'KN', 'KP', 'KR', 'KW', 'KY', 'KZ', 'LA', 'LB', 'LC',
    'LI', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV', 'LY', 'MA', 'MC', 'MD', 'ME', 'MF', 'MG', 'MH', 'MK',
    'ML', 'MM', 'MN', 'MO', 'MP', 'MQ', 'MR', 'MS', 'MT', 'MU', 'MV', 'MW', 'MX', 'MY', 'MZ', 'NA',
    'NC', 'NE', 'NF', 'NG', 'NI', 'NL', 'NO', 'NP', 'NR', 'NU', 'NZ', 'OM', 'PA', 'PE', 'PF', 'PG',
    'PH', 'PK', 'PL', 'PM', 'PN', 'PR', 'PS', 'PT', 'PW', 'PY', 'QA', 'RE', 'RO', 'RS', 'RU', 'RW',
    'SA', 'SB', 'SC', 'SD', 'SE', 'SG', 'SH', 'SI', 'SJ', 'SK', 'SL', 'SM', 'SN', 'SO', 'SR', 'SS',
    'ST', 'SV', 'SX', 'SY', 'SZ', 'TC', 'TD', 'TF', 'TG', 'TH', 'TJ', 'TK', 'TL', 'TM', 'TN', 'TO',
    'TR', 'TT', 'TV', 'TW', 'TZ', 'UA', 'UG', 'UM', 'US', 'UY', 'UZ', 'VA', 'VC', 'VE', 'VG', 'VI',
    'VN', 'VU', 'WF', 'WS', 'YE', 'YT', 'ZA', 'ZM', 'ZW'
];

function renderHtml(detectedCountryCode) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GDFinder - Find a graphic designer</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@600;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-color: #f5f3ed;
            --surface-color: #fffefa;
            --surface-muted: #eeeee6;
            --text-main: #1f2a25;
            --text-light: #69736d;
            --accent-primary: #e86f51;
            --accent-hover: #ce583c;
            --accent-soft: #fce5dc;
            --accent-secondary: #efb75e;
            --border-color: #dedfd6;
            --focus-ring: rgba(232, 111, 81, 0.22);
            --shadow-sm: 0 1px 2px rgba(31, 42, 37, 0.04), 0 10px 30px rgba(31, 42, 37, 0.04);
            --shadow-lg: 0 24px 70px rgba(23, 38, 31, 0.18);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { color-scheme: light; scroll-behavior: smooth; }
        body { background: radial-gradient(circle at 8% 2%, rgba(239, 183, 94, 0.13), transparent 25rem), var(--bg-color); color: var(--text-main); display: flex; flex-direction: column; min-height: 100vh; font-family: 'DM Sans', sans-serif; line-height: 1.5; }
        button, input, select, textarea { font: inherit; }
        button, a, select, input[type="range"] { -webkit-tap-highlight-color: transparent; }
        button:focus-visible, a:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible { outline: 3px solid var(--focus-ring); outline-offset: 2px; }

        /* Header & Search */
        header { padding: 68px 20px 44px; text-align: center; position: relative; overflow: hidden; }
        header::after { content: ''; position: absolute; width: 260px; height: 260px; right: -100px; top: -150px; border: 1px solid rgba(232, 111, 81, 0.18); border-radius: 50%; box-shadow: 0 0 0 40px rgba(232, 111, 81, 0.035), 0 0 0 80px rgba(232, 111, 81, 0.025); pointer-events: none; }
        h1 { color: var(--text-main); font-family: 'Manrope', sans-serif; font-size: clamp(2.5rem, 7vw, 4.6rem); font-weight: 800; letter-spacing: -0.07em; line-height: 1; margin-bottom: 18px; }
        h1 span { color: var(--accent-primary); }
        header p { color: var(--text-light); font-size: clamp(1rem, 2vw, 1.16rem); margin: 0 auto 30px; max-width: 620px; }

        .search-container { max-width: 720px; margin: 0 auto; position: relative; }
        .search-container::before { content: ''; position: absolute; z-index: 1; left: 20px; top: 50%; width: 20px; height: 20px; transform: translateY(-50%); background: no-repeat center / contain url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%2369736d' stroke-width='2' stroke-linecap='round'%3E%3Ccircle cx='11' cy='11' r='7'/%3E%3Cpath d='m20 20-3.5-3.5'/%3E%3C/svg%3E"); pointer-events: none; }
        .search-bar { width: 100%; padding: 17px 22px 17px 54px; font-size: 1rem; border: 1px solid var(--border-color); border-radius: 16px; outline: none; transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease; box-shadow: var(--shadow-sm); color: var(--text-main); background: rgba(255, 254, 250, 0.94); }
        .search-bar::placeholder { color: #8a928d; }
        .search-bar:hover { border-color: #c6c9be; }
        .search-bar:focus { border-color: var(--accent-primary); box-shadow: 0 0 0 4px var(--focus-ring), var(--shadow-sm); background: var(--surface-color); }

        /* Filters */
        .filters-wrapper { max-width: 1160px; width: calc(100% - 40px); margin: 0 auto; padding: 18px; background: rgba(255, 254, 250, 0.82); border-radius: 20px; box-shadow: var(--shadow-sm); border: 1px solid rgba(222, 223, 214, 0.9); backdrop-filter: blur(12px); }
        .filters-top-row { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)) auto; gap: 14px; align-items: end; }
        .filter-group { display: flex; min-width: 0; flex-direction: column; align-items: stretch; gap: 7px; }
        .filter-group label { font-weight: 600; color: var(--text-light); font-size: 0.76rem; letter-spacing: 0.04em; text-transform: uppercase; }

        select { appearance: none; width: 100%; min-height: 46px; padding: 11px 42px 11px 14px; border: 1px solid var(--border-color); border-radius: 12px; background-color: var(--surface-color); color: var(--text-main); font-size: 0.92rem; font-weight: 500; cursor: pointer; outline: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%2369736d' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center; transition: border-color 0.2s ease, box-shadow 0.2s ease; }
        select:hover { border-color: #c6c9be; }
        select:focus { border-color: var(--accent-primary); box-shadow: 0 0 0 4px var(--focus-ring); }
        .additional-filters-btn { min-height: 46px; padding: 10px 16px; border: 1px solid var(--border-color); border-radius: 12px; background: var(--text-main); color: white; display: inline-flex; align-items: center; justify-content: center; gap: 9px; font-size: 0.9rem; font-weight: 600; cursor: pointer; white-space: nowrap; transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease; }
        .additional-filters-btn svg { width: 17px; height: 17px; }
        .additional-filters-btn:hover { background: #34423b; box-shadow: 0 8px 18px rgba(31, 42, 37, 0.15); transform: translateY(-1px); }
        .additional-filters-btn.has-custom-filter::after { content: ''; width: 7px; height: 7px; border-radius: 50%; background: var(--accent-secondary); }

        /* AI Slider */
        .ai-slider-container { display: flex; align-items: flex-start; gap: 18px; background: var(--surface-muted); padding: 20px; border-radius: 16px; border: 1px solid var(--border-color); width: 100%; flex-direction: column; }
        .slider-header { display: flex; flex-direction: column; align-items: flex-start; gap: 16px; width: 100%; }
        .slider-header label { font-weight: 700; }
        .slider-wrapper { flex-grow: 1; display: flex; flex-direction: column; position: relative; width: 100%; }
        input[type=range] { appearance: none; -webkit-appearance: none; width: 100%; height: 24px; background: transparent; cursor: pointer; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; height: 20px; width: 20px; border: 3px solid var(--surface-color); border-radius: 50%; background: var(--accent-primary); cursor: pointer; margin-top: -7px; box-shadow: 0 1px 5px rgba(31, 42, 37, 0.25); }
        input[type=range]::-moz-range-thumb { height: 14px; width: 14px; border: 3px solid var(--surface-color); border-radius: 50%; background: var(--accent-primary); cursor: pointer; box-shadow: 0 1px 5px rgba(31, 42, 37, 0.25); }
        input[type=range]::-webkit-slider-runnable-track { width: 100%; height: 6px; cursor: pointer; background: #cfd2c7; border-radius: 999px; }
        input[type=range]::-moz-range-track { width: 100%; height: 6px; cursor: pointer; background: #cfd2c7; border-radius: 999px; }
        .slider-labels { display: flex; justify-content: space-between; margin-top: 5px; font-size: 0.78rem; color: var(--text-light); font-weight: 500; }
        .slider-labels span { cursor: pointer; transition: color 0.2s; }
        .slider-labels span.active { color: var(--text-main); font-weight: 700; }

        .ai-notification { color: var(--text-light); font-size: 0.88rem; line-height: 1.5; width: 100%; }
        .msg-green, .msg-amber, .msg-red { color: var(--text-light); }

        /* Main Grid */
        main { flex-grow: 1; max-width: 1200px; margin: 38px auto 70px; padding: 0 20px; width: 100%; }
        .results-header { display: flex; align-items: center; justify-content: space-between; gap: 18px; margin-bottom: 18px; }
        .results-count { font-size: 0.92rem; font-weight: 600; color: var(--text-light); }
        .add-link { color: var(--accent-hover); font-size: 0.9rem; font-weight: 700; text-decoration: none; transition: color 0.2s; }
        .add-link:hover { color: var(--text-main); }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: 18px; }

        /* Cards */
        .card { background: var(--surface-color); border-radius: 20px; padding: 22px; box-shadow: var(--shadow-sm); border: 1px solid rgba(222, 223, 214, 0.9); transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease; display: flex; flex-direction: column; gap: 16px; position: relative; min-height: 280px; }
        .card:hover { transform: translateY(-3px); border-color: #cfd2c7; box-shadow: 0 18px 40px rgba(31, 42, 37, 0.09); }
        .card-header { display: flex; gap: 14px; align-items: center; padding-right: 28px; }
        .avatar { width: 56px; height: 56px; border-radius: 16px; display: flex; flex-shrink: 0; align-items: center; justify-content: center; font-family: 'Manrope', sans-serif; font-size: 1.08rem; font-weight: 800; color: var(--surface-color); text-transform: uppercase; }
        .info { min-width: 0; }
        .info h2 { font-family: 'Manrope', sans-serif; font-size: 1.12rem; color: var(--text-main); line-height: 1.25; margin-bottom: 4px; letter-spacing: -0.02em; }
        .location { font-size: 0.82rem; color: var(--text-light); display: flex; align-items: center; gap: 5px; }
        .stats { display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: 14px; border-top: 1px solid var(--border-color); font-size: 0.86rem; }
        .rating { font-weight: 700; color: #9a6519; display: flex; align-items: center; gap: 5px; }
        .turnaround { color: var(--text-light); font-weight: 500; font-size: 0.82rem; }
        .categories { display: flex; flex-wrap: wrap; gap: 7px; }
        .tag { background: var(--surface-muted); border: 1px solid transparent; color: #445149; padding: 5px 9px; border-radius: 7px; font-size: 0.75rem; font-weight: 600; }
        .language-tag { font-size: 0.8rem; color: var(--text-light); }

        .ai-status { align-self: flex-start; display: inline-block; padding: 5px 9px; border-radius: 7px; font-size: 0.73rem; font-weight: 600; text-align: center; }
        .ai-0 { background: #e1efe5; color: #346449; }
        .ai-1 { background: #f6ead2; color: #7a571f; }
        .ai-2 { background: #f6e2dd; color: #884837; }

        .btn-main { width: 100%; padding: 13px 18px; border: none; border-radius: 12px; background: var(--accent-primary); color: white; font-size: 0.95rem; font-weight: 700; cursor: pointer; transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease; margin-top: 10px; }
        .btn-main:hover:not(:disabled) { background: var(--accent-hover); box-shadow: 0 8px 18px rgba(206, 88, 60, 0.2); transform: translateY(-1px); }
        .btn-main:disabled { opacity: 0.6; cursor: not-allowed; }

        .empty-state { grid-column: 1 / -1; text-align: center; padding: 58px 24px; color: var(--text-light); font-size: 1rem; background: rgba(255, 254, 250, 0.7); border-radius: 20px; border: 1px dashed #c8ccc1; }

        /* Loading Spinner */
        .loader-container { grid-column: 1 / -1; display: flex; justify-content: center; padding: 40px; }
        .loader { border: 3px solid var(--border-color); border-top: 3px solid var(--accent-primary); border-radius: 50%; width: 34px; height: 34px; animation: spin 0.8s linear infinite; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

        /* Footer */
        footer { background: var(--text-main); padding: 44px 20px; text-align: center; margin-top: auto; }
        .footer-btn { background: var(--surface-color); border: 0; color: var(--text-main); padding: 13px 22px; font-size: 0.95rem; font-weight: 700; border-radius: 12px; cursor: pointer; transition: background 0.2s ease, transform 0.2s ease; }
        .footer-btn:hover { background: var(--accent-soft); transform: translateY(-1px); }

        /* Modal */
        .modal-overlay { position: fixed; inset: 0; width: 100%; height: 100%; padding: 20px; background: rgba(20, 31, 26, 0.58); display: none; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(8px); }
        .modal-overlay.active { display: flex; }
        .modal-content { background: var(--surface-color); padding: 34px; border-radius: 22px; max-width: 600px; width: 100%; box-shadow: var(--shadow-lg); position: relative; max-height: calc(100vh - 40px); overflow-y: auto; }
        .modal-close { position: absolute; top: 18px; right: 18px; width: 36px; height: 36px; display: grid; place-items: center; font-size: 1.45rem; line-height: 1; cursor: pointer; color: var(--text-light); border: 1px solid var(--border-color); border-radius: 10px; background: var(--surface-color); transition: color 0.2s ease, background 0.2s ease; }
        .modal-close:hover { color: var(--text-main); background: var(--surface-muted); }
        .modal-step { display: none; }
        .modal-step.active { display: block; animation: fadeIn 0.22s ease; }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .modal-step h2, .filter-modal-heading h2 { color: var(--text-main); font-family: 'Manrope', sans-serif; margin-bottom: 18px; font-size: 1.65rem; letter-spacing: -0.035em; }
        .modal-step ul { margin: 15px 0 20px 20px; line-height: 1.6; color: var(--text-main); }
        .modal-step > p:not(.inline-error), .filter-modal-heading p { color: var(--text-light); font-size: 0.94rem; margin: -8px 0 20px; }
        .form-group { margin-bottom: 13px; }
        .form-group input, .form-group select { width: 100%; padding: 13px 15px; border: 1px solid var(--border-color); border-radius: 12px; font-size: 0.94rem; outline: none; background: var(--surface-color); color: var(--text-main); transition: border-color 0.2s ease, box-shadow 0.2s ease; }
        .form-group input:focus, .form-group select:focus { border-color: var(--accent-primary); box-shadow: 0 0 0 4px var(--focus-ring); }
        .form-group input[readonly] { background: var(--surface-muted); color: var(--text-light); cursor: not-allowed; }
        .form-group textarea { width: 100%; padding: 13px 15px; border: 1px solid var(--border-color); border-radius: 12px; font-size: 0.94rem; outline: none; background: var(--surface-color); color: var(--text-main); transition: border-color 0.2s ease, box-shadow 0.2s ease; resize: vertical; font-family: 'DM Sans', sans-serif; }
        .form-group textarea:focus { border-color: var(--accent-primary); box-shadow: 0 0 0 4px var(--focus-ring); }
        .form-group.check-group { display: flex; align-items: center; gap: 10px; }
        .form-group.check-group input[type="checkbox"] { width: auto; padding: 0; flex-shrink: 0; cursor: pointer; }
        .form-group.check-group label { cursor: pointer; }
        .inline-error { color: #a64032; font-size: 0.86rem; font-weight: 600; margin-bottom: 10px; display: none; }
        .btn-secondary { width: 100%; padding: 11px 16px; border: 1px solid var(--border-color); border-radius: 12px; background: transparent; color: var(--text-light); font-size: 0.92rem; font-weight: 600; cursor: pointer; transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease; margin-top: 8px; }
        .btn-secondary:hover { border-color: #b9beb2; color: var(--text-main); background: var(--surface-muted); }
        .btn-danger { width: 100%; padding: 11px 16px; border: 1px solid #d5a095; border-radius: 12px; background: transparent; color: #8d3d30; font-size: 0.92rem; font-weight: 600; cursor: pointer; transition: background 0.2s ease; margin-top: 8px; }
        .btn-danger:hover { background: #f7e2dd; }
        .btn-danger:disabled { opacity: 0.6; cursor: not-allowed; }
        .edit-btn { position: absolute; top: 16px; right: 16px; width: 32px; height: 32px; border: 1px solid var(--border-color); background: var(--surface-color); border-radius: 9px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--text-light); font-size: 0.8rem; transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease; padding: 0; line-height: 1; }
        .edit-btn:hover { background: var(--surface-muted); border-color: #b9beb2; color: var(--text-main); }
        .avatar-img { width: 56px; height: 56px; border-radius: 16px; object-fit: cover; flex-shrink: 0; }
        .form-email-display { background: var(--surface-muted); border: 1px solid var(--border-color); border-radius: 10px; padding: 8px 14px; font-size: 0.86rem; color: var(--text-light); font-weight: 600; margin-bottom: 18px; text-align: center; }
        .agreement { margin: 15px 0 20px; display: flex; flex-direction: column; gap: 10px; }
        .agreement label { display: flex; align-items: center; gap: 10px; cursor: pointer; font-size: 0.95rem; }
        .agreement input[type="checkbox"] { width: auto; flex-shrink: 0; cursor: pointer; }
        .accordion { border: 1px solid var(--border-color); border-radius: 14px; margin-bottom: 10px; overflow: hidden; }
        .accordion summary { padding: 13px 16px; font-weight: 600; cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; background: var(--surface-muted); }
        .accordion summary::-webkit-details-marker { display: none; }
        .accordion summary::after { content: '›'; font-size: 1.4rem; color: var(--text-light); transition: transform 0.2s; display: inline-block; }
        .accordion[open] summary::after { transform: rotate(90deg); }
        .accordion > div { padding: 14px 14px 1px; }
        .filter-modal-content { max-width: 520px; }
        .filter-modal-heading { padding-right: 48px; }
        .eyebrow { color: var(--accent-hover); display: block; font-size: 0.73rem; font-weight: 700; letter-spacing: 0.08em; margin-bottom: 7px; text-transform: uppercase; }
        .filter-modal-actions { display: grid; grid-template-columns: 1fr 1.5fr; gap: 10px; margin-top: 20px; }
        .filter-modal-actions .btn-main, .filter-modal-actions .btn-secondary { margin-top: 0; }
        body.modal-open { overflow: hidden; }

        @media (max-width: 760px) {
            header { padding: 48px 20px 30px; }
            header::after { opacity: 0.55; }
            h1 { font-size: clamp(2.45rem, 15vw, 3.7rem); }
            header p { margin-bottom: 24px; }
            .filters-wrapper { width: calc(100% - 28px); padding: 14px; border-radius: 17px; }
            .filters-top-row { grid-template-columns: 1fr 1fr; }
            .additional-filters-btn { grid-column: 1 / -1; }
            main { margin-top: 30px; padding: 0 14px; }
            .grid { grid-template-columns: 1fr; }
            .modal-overlay { align-items: flex-end; padding: 0; }
            .modal-content { border-radius: 22px 22px 0 0; max-height: 92vh; padding: 28px 20px calc(24px + env(safe-area-inset-bottom)); }
        }

        @media (max-width: 480px) {
            .filters-top-row { grid-template-columns: 1fr; }
            .additional-filters-btn { grid-column: auto; }
            .results-header { align-items: flex-start; flex-direction: column; gap: 6px; }
            .filter-modal-actions { grid-template-columns: 1fr; }
        }

        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after { scroll-behavior: auto !important; transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }
        }
    </style>
</head>
<body>

    <header>
        <h1>GD<span>Finder</span></h1>
        <p>Find an independent graphic designer whose style, skills, and process fit your project.</p>
        <div class="search-container">
            <input type="search" id="searchInput" class="search-bar" placeholder="Search by name or specialism" aria-label="Search designers">
        </div>
    </header>

    <div class="filters-wrapper">
        <div class="filters-top-row">
            <div class="filter-group">
                <label for="locationFilter">Country</label>
                <select id="locationFilter">
                    <option value="All">All countries</option>
                </select>
            </div>

            <div class="filter-group">
                <label for="sortOrder">Sort by</label>
                <select id="sortOrder">
                    <option value="ratingDesc">Highest rated</option>
                    <option value="ratingAsc">Lowest rated</option>
                    <option value="speed">Fastest turnaround</option>
                </select>
            </div>
            <button type="button" class="additional-filters-btn" id="additionalFiltersButton" onclick="openFiltersModal()" aria-haspopup="dialog" aria-controls="filtersModal" aria-expanded="false">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M7 12h10M10 17h4"/></svg>
                Additional filters
            </button>
        </div>
    </div>

    <main>
        <div class="results-header">
            <div class="results-count" id="resultsCount">Loading designers...</div>
            <a href="#" onclick="openModal(); return false;" class="add-link">List your services</a>
        </div>
        
        <div class="grid" id="designersGrid">
            <div class="loader-container"><div class="loader"></div></div>
        </div>
    </main>

    <footer>
        <button class="footer-btn" onclick="openModal()">Join the directory</button>
    </footer>

    <!-- Additional filters modal -->
    <div class="modal-overlay" id="filtersModal" role="dialog" aria-modal="true" aria-labelledby="filters-title">
        <div class="modal-content filter-modal-content">
            <button type="button" class="modal-close" onclick="closeFiltersModal()" aria-label="Close additional filters">&times;</button>
            <div class="filter-modal-heading">
                <span class="eyebrow">Refine your search</span>
                <h2 id="filters-title">Additional filters</h2>
            </div>
            <div class="ai-slider-container">
                <div class="slider-header">
                    <label for="aiSlider">Maximum AI level</label>
                    <div class="slider-wrapper">
                        <input type="range" id="aiSlider" min="0" max="2" value="1" step="1">
                        <div class="slider-labels">
                            <span id="label-ai-0">No AI</span>
                            <span id="label-ai-1" class="active">AI-assisted</span>
                            <span id="label-ai-2">AI-generated</span>
                        </div>
                    </div>
                </div>
                <div id="aiNotification" class="ai-notification msg-amber">
                    Include designers who use AI as a supporting tool in their process.
                </div>
            </div>
            <div class="filter-modal-actions">
                <button type="button" class="btn-secondary" onclick="resetAdditionalFilters()">Reset</button>
                <button type="button" class="btn-main" onclick="applyAdditionalFilters()">Apply filters</button>
            </div>
        </div>
    </div>

    <!-- Add/Edit Designer Modal -->
    <div class="modal-overlay" id="designerModal" role="dialog" aria-modal="true" aria-label="Designer profile">
        <div class="modal-content">
            <button type="button" class="modal-close" onclick="closeModal()" aria-label="Close designer profile">&times;</button>

            <div class="modal-step active" id="step-1">
                <h2>Join GDFinder</h2>
                <p class="inline-error" id="step1-error"></p>
                <div class="form-group">
                    <input type="email" id="form-email" placeholder="Your email address">
                </div>
                <div class="agreement" id="step1-agreements">
                    <label><input type="checkbox" id="agree-real"> I will use my real name or legal organisation name.</label>
                    <label><input type="checkbox" id="agree-ai"> I will correctly label my AI use.</label>
                    <label><input type="checkbox" id="agree-ban"> I understand that incorrect labelling results in a ban.</label>
                </div>
                <button type="button" class="btn-main" id="sendOtpBtn" onclick="sendOtp()" disabled>Send verification code</button>
            </div>

            <div class="modal-step" id="step-2">
                <h2>Verify your email</h2>
                <p>A verification code has been sent to your email.</p>
                <p class="inline-error" id="step2-error"></p>
                <div class="form-group">
                    <input type="text" id="form-code" placeholder="Enter verification code" maxlength="12" inputmode="numeric">
                </div>
                <button class="btn-main" id="verifyBtn" onclick="verifyOtp()">Verify</button>
                <button class="btn-secondary" onclick="goToStep(1)">&#8592; Back</button>
            </div>

            <div class="modal-step" id="step-3">
                <h2>Your profile</h2>
                <div class="form-email-display" id="display-email"></div>
                <p class="inline-error" id="step3-error"></p>
                <form id="profileForm" onsubmit="submitProfile(event)">
                    <details class="accordion" open>
                        <summary>Identity</summary>
                        <div>
                            <div class="form-group"><input type="text" id="form-name" placeholder="Name" required maxlength="100"></div>
                            <div class="form-group">
                                <select id="form-listing-type">
                                    <option value="freelancer">Freelancer</option>
                                    <option value="sole_trader">Sole trader</option>
                                    <option value="company">Company</option>
                                    <option value="agency">Agency</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div class="form-group"><textarea id="form-bio" placeholder="Bio (max 300 characters)" maxlength="300" rows="3"></textarea></div>
                            <div class="form-group">
                                <select id="form-availability">
                                    <option value="available">Available</option>
                                    <option value="busy">Busy</option>
                                    <option value="unavailable">Unavailable</option>
                                </select>
                            </div>
                        </div>
                    </details>
                    <details class="accordion">
                        <summary>Location</summary>
                        <div>
                            <div class="form-group"><input type="text" id="form-city" placeholder="City" required maxlength="100"></div>
                            <div class="form-group">
                                <select id="form-country-code" required>
                                    <option value="" disabled selected>Select country</option>
                                </select>
                            </div>
                        </div>
                    </details>
                    <details class="accordion">
                        <summary>Work</summary>
                        <div>
                            <div class="form-group"><input type="text" id="form-cats" placeholder="Categories (e.g. Logos, Flyers)" required></div>
                            <div class="form-group"><input type="text" id="form-langs" placeholder="Languages (e.g. English, French)" required></div>
                            <div class="form-group"><input type="number" id="form-turnaround" placeholder="Average turnaround (days)" required min="1" max="365"></div>
                            <div class="form-group">
                                <select id="form-ai" required>
                                    <option value="" disabled selected>Select AI use level</option>
                                    <option value="0">No AI (human-made only)</option>
                                    <option value="1">AI-assisted (ideation and textures)</option>
                                    <option value="2">AI-generated (prompts and direct renders)</option>
                                </select>
                            </div>
                        </div>
                    </details>
                    <details class="accordion">
                        <summary>Pricing</summary>
                        <div>
                            <div class="form-group">
                                <select id="form-price-range">
                                    <option value="">Select price range</option>
                                    <option value="budget">Budget</option>
                                    <option value="mid">Mid</option>
                                    <option value="premium">Premium</option>
                                    <option value="enterprise">Enterprise</option>
                                </select>
                            </div>
                            <div class="form-group"><input type="text" id="form-pricing-structure" placeholder="Pricing structure (max 150 chars)" maxlength="150"></div>
                            <div class="form-group"><input type="text" id="form-preferred-client" placeholder="Preferred client type (max 150 chars)" maxlength="150"></div>
                        </div>
                    </details>
                    <details class="accordion">
                        <summary>Contact</summary>
                        <div>
                            <div class="form-group check-group"><input type="checkbox" id="form-email-shown"><label for="form-email-shown">Show email on listing</label></div>
                            <div class="form-group" id="form-listing-email-group" hidden><input type="email" id="form-listing-email" aria-label="Email shown on listing" readonly></div>
                            <div class="form-group check-group"><input type="checkbox" id="form-phone-visible"><label for="form-phone-visible">Show phone number on listing</label></div>
                            <div class="form-group" id="form-phone-group" hidden><input type="tel" id="form-phone" placeholder="Phone number" maxlength="30"></div>
                        </div>
                    </details>
                    <details class="accordion">
                        <summary>Links and social profiles</summary>
                        <div>
                            <div class="form-group"><input type="url" id="form-website" placeholder="Website URL"></div>
                            <div class="form-group"><input type="text" id="form-instagram" placeholder="Instagram username"></div>
                            <div class="form-group"><input type="text" id="form-dribbble" placeholder="Dribbble username"></div>
                            <div class="form-group"><input type="text" id="form-behance" placeholder="Behance username"></div>
                            <div class="form-group"><input type="text" id="form-bluesky" placeholder="Bluesky handle"></div>
                            <div class="form-group"><input type="text" id="form-twitter" placeholder="Twitter/X username"></div>
                            <div class="form-group"><input type="text" id="form-facebook" placeholder="Facebook page"></div>
                            <div class="form-group"><input type="url" id="form-youtube" placeholder="YouTube channel URL"></div>
                        </div>
                    </details>
                    <button type="submit" id="submitBtn" class="btn-main">Submit profile</button>
                </form>
                <button id="hide-listing-btn" class="btn-danger" style="display:none" onclick="openHideConfirm()">Hide from directory</button>
            </div>

            <div class="modal-step" id="step-4">
                <h2>All done</h2>
                <p id="step4-message">Your profile has been submitted for review. It will go live once approved.</p>
                <br>
                <button class="btn-main" onclick="closeModal(); fetchDesigners();">View directory</button>
            </div>
        </div>
    </div>

    <!-- Hide listing confirmation modal -->
    <div class="modal-overlay" id="hideConfirmModal" role="dialog" aria-modal="true" aria-labelledby="hide-modal-title">
        <div class="modal-content" style="max-width: 420px; text-align: center;">
            <h2 id="hide-modal-title" style="color: #8d3d30; margin-bottom: 15px; font-size: 1.5rem;">Hide your listing?</h2>
            <p style="color: var(--text-light); margin-bottom: 20px;">Your listing will no longer appear in the directory. Contact us to reinstate it.</p>
            <p class="inline-error" id="hide-error"></p>
            <button id="hide-confirm-btn" class="btn-danger" onclick="confirmHide()">Yes, hide my listing</button>
            <button class="btn-secondary" onclick="cancelHide()">Cancel</button>
        </div>
    </div>

    <script>
        // Escape user-supplied strings before inserting into innerHTML
        function escapeHtml(str) {
            const d = document.createElement('div');
            d.textContent = String(str);
            return d.innerHTML;
        }

        const searchInput = document.getElementById('searchInput');
        const aiSlider = document.getElementById('aiSlider');
        const locationFilter = document.getElementById('locationFilter');
        const sortOrder = document.getElementById('sortOrder');
        const designersGrid = document.getElementById('designersGrid');
        const resultsCount = document.getElementById('resultsCount');
        const aiNotification = document.getElementById('aiNotification');
        const additionalFiltersButton = document.getElementById('additionalFiltersButton');
        const agreementCheckboxes = [...document.querySelectorAll('#step1-agreements input[type="checkbox"]')];
        const sendOtpButton = document.getElementById('sendOtpBtn');
        const emailShownCheckbox = document.getElementById('form-email-shown');
        const listingEmailGroup = document.getElementById('form-listing-email-group');
        const listingEmailInput = document.getElementById('form-listing-email');
        const phoneVisibleCheckbox = document.getElementById('form-phone-visible');
        const phoneGroup = document.getElementById('form-phone-group');
        const phoneInput = document.getElementById('form-phone');
        const countryCodes = ${JSON.stringify(ISO_COUNTRY_CODES)};
        const detectedCountryCode = ${JSON.stringify(detectedCountryCode)};
        const countryDisplayNames = typeof Intl.DisplayNames === 'function'
            ? new Intl.DisplayNames(['en-GB'], { type: 'region' })
            : null;
        const sliderLabels = [
            document.getElementById('label-ai-0'),
            document.getElementById('label-ai-1'),
            document.getElementById('label-ai-2')
        ];

        const aiMessages = [
            { text: 'Only include designers who do not use generative AI.', cls: 'msg-green' },
            { text: 'Include designers who use AI as a supporting tool in their process.', cls: 'msg-amber' },
            { text: 'Include all designers, including those who create AI-generated work.', cls: 'msg-red' }
        ];

        let sessionId = null;
        let editingDesignerId = null;
        let pendingEditDesignerId = null;
        let aiValueBeforeModal = '1';
        let sendingOtp = false;

        function getCountryName(code) {
            return countryDisplayNames ? countryDisplayNames.of(code) || code : code;
        }

        function populateCountryDropdowns() {
            const countries = countryCodes
                .map(code => ({ code, name: getCountryName(code) }))
                .sort((a, b) => a.name.localeCompare(b.name, 'en-GB'));
            const options = countries
                .map(country => \`<option value="\${country.code}">\${escapeHtml(country.name)}</option>\`)
                .join('');

            locationFilter.innerHTML = '<option value="All">All countries</option>' + options;
            document.getElementById('form-country-code').innerHTML = '<option value="" disabled selected>Select country</option>' + options;
        }

        function updateSendOtpButtonState() {
            const hasAcceptedAgreements = agreementCheckboxes.every(checkbox => checkbox.checked);
            sendOtpButton.disabled = sendingOtp || (!pendingEditDesignerId && !hasAcceptedAgreements);
        }

        function updateContactFields() {
            listingEmailGroup.hidden = !emailShownCheckbox.checked;
            listingEmailInput.value = emailShownCheckbox.checked
                ? document.getElementById('form-email').value.trim()
                : '';
            phoneGroup.hidden = !phoneVisibleCheckbox.checked;
            phoneInput.required = phoneVisibleCheckbox.checked;
        }

        // Read URL params and set initial UI state
        function initUIFromURL() {
            const params = new URLSearchParams(window.location.search);
            if (params.has('q')) searchInput.value = params.get('q');
            const aiParam = params.get('ai');
            if (['0', '1', '2'].includes(aiParam)) aiSlider.value = aiParam;
            const countryParam = (params.get('country') || '').toUpperCase();
            if (countryCodes.includes(countryParam)) {
                locationFilter.value = countryParam;
            } else if (detectedCountryCode && [...locationFilter.options].some(option => option.value === detectedCountryCode)) {
                locationFilter.value = detectedCountryCode;
                params.set('country', detectedCountryCode);
                window.history.replaceState({}, '', '?' + params.toString());
            }
            if (params.has('sort')) sortOrder.value = params.get('sort');
            updateSliderUI();
        }

        // Update URL based on UI state to enable Edge Caching
        function updateURL() {
            const params = new URLSearchParams();
            if (searchInput.value) params.set('q', searchInput.value);
            params.set('ai', aiSlider.value);
            if (locationFilter.value !== 'All') params.set('country', locationFilter.value);
            params.set('sort', sortOrder.value);
            
            window.history.replaceState({}, '', '?' + params.toString());
            fetchDesigners();
        }

        function updateSliderUI() {
            const val = parseInt(aiSlider.value, 10);
            sliderLabels.forEach((lbl, idx) => lbl.className = idx === val ? 'active' : '');
            aiNotification.textContent = aiMessages[val].text;
            aiNotification.className = 'ai-notification ' + aiMessages[val].cls;
            additionalFiltersButton.classList.toggle('has-custom-filter', val !== 1);
        }

        function getInitials(name) { return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2); }
        function getAiStatusLabel(level) {
            if (level === 0) return { text: 'No AI used', cls: 'ai-0' };
            if (level === 1) return { text: 'AI-assisted', cls: 'ai-1' };
            return { text: 'AI-generated', cls: 'ai-2' };
        }

        // Fetch filtered data directly using query strings (Cached by CDN)
        async function fetchDesigners() {
            designersGrid.innerHTML = '<div class="loader-container"><div class="loader"></div></div>';
            try {
                const response = await fetch('/api/designers' + window.location.search);
                if (!response.ok) throw new Error('Server error');
                const data = await response.json();
                
                resultsCount.textContent = \`\${data.length} designer\${data.length !== 1 ? 's' : ''} found\`;
                
                if (data.length === 0) {
                    designersGrid.innerHTML = '<div class="empty-state">No designers match your filters. Try broadening your search.</div>';
                    return;
                }

                designersGrid.innerHTML = data.map(designer => {
                    const aiStatus = getAiStatusLabel(designer.aiLevel);
                    const cats = designer.categories.map(c => \`<span class="tag">\${escapeHtml(c)}</span>\`).join('');
                    const location = designer.city + (designer.countryCode ? ', ' + designer.countryCode : '');
                    const avatarHtml = designer.gravatarHash
                        ? \`<div style="flex-shrink:0"><img class="avatar-img" src="https://www.gravatar.com/avatar/\${escapeHtml(designer.gravatarHash)}?d=404&s=120" alt="" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="avatar" style="background-color:\${escapeHtml(designer.avatarColor)};display:none">\${escapeHtml(getInitials(designer.name))}</div></div>\`
                        : \`<div class="avatar" style="background-color:\${escapeHtml(designer.avatarColor)}">\${escapeHtml(getInitials(designer.name))}</div>\`;
                    return \`
                        <div class="card">
                            <button class="edit-btn" onclick="openModalForEdit('\${escapeHtml(designer.id)}')" title="Edit listing" aria-label="Edit \${escapeHtml(designer.name)}"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z"/></svg></button>
                            <div class="card-header">
                                \${avatarHtml}
                                <div class="info">
                                    <h2>\${escapeHtml(designer.name)}</h2>
                                    <div class="location">\${escapeHtml(location)}</div>
                                </div>
                            </div>
                            <div class="categories">\${cats}</div>
                            <div class="language-tag"><strong>Languages:</strong> \${escapeHtml(designer.languages.join(', '))}</div>
                            <div class="stats">
                                <div class="rating">★ \${designer.upvotes}</div>
                                <div class="turnaround">\${designer.turnaroundDays} \${designer.turnaroundDays === 1 ? 'day' : 'days'} turnaround</div>
                            </div>
                            <div class="ai-status \${aiStatus.cls}">\${aiStatus.text}</div>
                        </div>
                    \`;
                }).join('');
            } catch (err) {
                designersGrid.innerHTML = '<div class="empty-state">We could not load the directory. Please refresh the page.</div>';
            }
        }

        // Event Listeners for UI
        let searchDebounce;
        searchInput.addEventListener('input', () => { clearTimeout(searchDebounce); searchDebounce = setTimeout(updateURL, 300); });
        aiSlider.addEventListener('input', updateSliderUI);
        locationFilter.addEventListener('change', updateURL);
        sortOrder.addEventListener('change', updateURL);
        agreementCheckboxes.forEach(checkbox => checkbox.addEventListener('change', updateSendOtpButtonState));
        emailShownCheckbox.addEventListener('change', updateContactFields);
        phoneVisibleCheckbox.addEventListener('change', updateContactFields);
        
        sliderLabels.forEach((lbl, idx) => {
            lbl.addEventListener('click', () => { aiSlider.value = idx; updateSliderUI(); });
        });

        // Modal controls
        function syncModalOpenState() {
            const hasOpenModal = document.querySelector('.modal-overlay.active');
            document.body.classList.toggle('modal-open', !!hasOpenModal);
        }
        function openFiltersModal() {
            aiValueBeforeModal = aiSlider.value;
            const filtersModal = document.getElementById('filtersModal');
            filtersModal.classList.add('active');
            additionalFiltersButton.setAttribute('aria-expanded', 'true');
            syncModalOpenState();
            requestAnimationFrame(() => aiSlider.focus());
        }
        function closeFiltersModal(restoreValue = true) {
            if (restoreValue) {
                aiSlider.value = aiValueBeforeModal;
                updateSliderUI();
            }
            document.getElementById('filtersModal').classList.remove('active');
            additionalFiltersButton.setAttribute('aria-expanded', 'false');
            syncModalOpenState();
            additionalFiltersButton.focus();
        }
        function resetAdditionalFilters() {
            aiSlider.value = '1';
            updateSliderUI();
        }
        function applyAdditionalFilters() {
            closeFiltersModal(false);
            updateURL();
        }
        function goToStep(step) {
            document.querySelectorAll('.modal-step').forEach(s => s.classList.remove('active'));
            document.getElementById('step-' + step).classList.add('active');
        }
        function resetModal() {
            sessionId = null;
            editingDesignerId = null;
            pendingEditDesignerId = null;
            document.getElementById('profileForm').reset();
            agreementCheckboxes.forEach(checkbox => { checkbox.checked = false; });
            document.getElementById('form-email').value = '';
            document.getElementById('form-code').value = '';
            listingEmailInput.value = '';
            document.querySelectorAll('.inline-error').forEach(el => { el.style.display = 'none'; el.textContent = ''; });
            document.querySelector('#step-1 h2').textContent = 'Join GDFinder';
            document.getElementById('step1-agreements').style.display = '';
            document.getElementById('submitBtn').textContent = 'Submit profile';
            document.getElementById('hide-listing-btn').style.display = 'none';
            updateContactFields();
            updateSendOtpButtonState();
            goToStep(1);
        }
        function openModal() {
            resetModal();
            document.getElementById('designerModal').classList.add('active');
            syncModalOpenState();
            requestAnimationFrame(() => document.getElementById('form-email').focus());
        }
        function openModalForEdit(designerId) {
            resetModal();
            pendingEditDesignerId = designerId;
            document.querySelector('#step-1 h2').textContent = 'Edit your listing';
            document.getElementById('step1-agreements').style.display = 'none';
            updateSendOtpButtonState();
            document.getElementById('designerModal').classList.add('active');
            syncModalOpenState();
            requestAnimationFrame(() => document.getElementById('form-email').focus());
        }
        function closeModal() {
            document.getElementById('designerModal').classList.remove('active');
            resetModal();
            syncModalOpenState();
        }

        function showError(el, msg) {
            el.textContent = msg;
            el.style.display = 'block';
        }

        // Step 1: send OTP
        async function sendOtp() {
            const email = document.getElementById('form-email').value.trim();
            const errorEl = document.getElementById('step1-error');
            errorEl.style.display = 'none';

            if (!email) return showError(errorEl, 'Please enter your email address.');
            if (!pendingEditDesignerId) {
                if (!document.getElementById('agree-real').checked ||
                    !document.getElementById('agree-ai').checked ||
                    !document.getElementById('agree-ban').checked) {
                    return showError(errorEl, 'Please tick all three agreements.');
                }
            }

            sendingOtp = true;
            updateSendOtpButtonState();
            sendOtpButton.textContent = 'Sending...';

            try {
                const res = await fetch('/api/otp/send', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email })
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Failed to send code.');
                goToStep(2);
            } catch (err) {
                showError(errorEl, err.message);
            } finally {
                sendingOtp = false;
                updateSendOtpButtonState();
                sendOtpButton.textContent = 'Send verification code';
            }
        }

        // Step 2: verify OTP
        async function verifyOtp() {
            const code = document.getElementById('form-code').value.replace(/\\D/g, '');
            const email = document.getElementById('form-email').value.trim();
            const errorEl = document.getElementById('step2-error');
            errorEl.style.display = 'none';

            if (!code) return showError(errorEl, 'Please enter the verification code.');

            const btn = document.getElementById('verifyBtn');
            btn.disabled = true;
            btn.textContent = 'Verifying...';

            try {
                const res = await fetch('/api/otp/verify', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, code })
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Verification failed.');

                if (pendingEditDesignerId) {
                    if (!data.designer || data.designer.id !== pendingEditDesignerId) {
                        return showError(errorEl, 'That email address is not associated with this listing.');
                    }
                }

                sessionId = data.sessionId;
                editingDesignerId = data.designer ? data.designer.id : null;

                document.getElementById('display-email').textContent = email;
                listingEmailInput.value = email;
                if (data.designer) populateForm(data.designer);
                else updateContactFields();

                document.getElementById('submitBtn').textContent = editingDesignerId ? 'Save changes' : 'Submit profile';
                document.getElementById('hide-listing-btn').style.display = editingDesignerId ? '' : 'none';

                goToStep(3);
            } catch (err) {
                showError(errorEl, err.message);
            } finally {
                btn.disabled = false;
                btn.textContent = 'Verify';
            }
        }

        // Pre-fill form when editing
        function populateForm(d) {
            document.getElementById('form-name').value = d.name || '';
            document.getElementById('form-listing-type').value = d.listingType || 'freelancer';
            document.getElementById('form-bio').value = d.bio || '';
            document.getElementById('form-availability').value = d.availability || 'available';
            document.getElementById('form-city').value = d.city || '';
            document.getElementById('form-country-code').value = d.countryCode || '';
            document.getElementById('form-cats').value = (d.categories || []).join(', ');
            document.getElementById('form-langs').value = (d.languages || []).join(', ');
            document.getElementById('form-turnaround').value = d.turnaroundDays || '';
            document.getElementById('form-ai').value = d.aiLevel != null ? String(d.aiLevel) : '';
            document.getElementById('form-price-range').value = d.priceRange || '';
            document.getElementById('form-pricing-structure').value = d.pricingStructure || '';
            document.getElementById('form-preferred-client').value = d.preferredClient || '';
            document.getElementById('form-email-shown').checked = !!d.emailShown;
            document.getElementById('form-phone').value = d.phoneNumber || '';
            document.getElementById('form-phone-visible').checked = !!d.phoneNumberVisible;
            document.getElementById('form-website').value = d.website || '';
            document.getElementById('form-instagram').value = d.instagram || '';
            document.getElementById('form-dribbble').value = d.dribbble || '';
            document.getElementById('form-behance').value = d.behance || '';
            document.getElementById('form-bluesky').value = d.bluesky || '';
            document.getElementById('form-twitter').value = d.twitter || '';
            document.getElementById('form-facebook').value = d.facebook || '';
            document.getElementById('form-youtube').value = d.youtube || '';
            updateContactFields();
        }

        // Step 3: submit profile (create or update)
        async function submitProfile(event) {
            event.preventDefault();
            const errorEl = document.getElementById('step3-error');
            errorEl.style.display = 'none';

            const categories = document.getElementById('form-cats').value.split(',').map(s => s.trim()).filter(Boolean);
            const languages = document.getElementById('form-langs').value.split(',').map(s => s.trim()).filter(Boolean);
            const aiVal = document.getElementById('form-ai').value;
            const phoneNumberVisible = phoneVisibleCheckbox.checked;

            if (categories.length === 0) return showError(errorEl, 'Please enter at least one category.');
            if (languages.length === 0) return showError(errorEl, 'Please enter at least one language.');
            if (aiVal === '') return showError(errorEl, 'Please select your AI use level.');

            const payload = {
                sessionId,
                name: document.getElementById('form-name').value.trim(),
                listingType: document.getElementById('form-listing-type').value,
                bio: document.getElementById('form-bio').value.trim() || null,
                availability: document.getElementById('form-availability').value,
                city: document.getElementById('form-city').value.trim(),
                countryCode: document.getElementById('form-country-code').value.trim().toUpperCase(),
                categories,
                languages,
                turnaroundDays: parseInt(document.getElementById('form-turnaround').value, 10),
                aiLevel: parseInt(aiVal, 10),
                priceRange: document.getElementById('form-price-range').value || null,
                pricingStructure: document.getElementById('form-pricing-structure').value.trim() || null,
                preferredClient: document.getElementById('form-preferred-client').value.trim() || null,
                emailShown: document.getElementById('form-email-shown').checked ? 1 : 0,
                phoneNumber: phoneInput.value.trim() || null,
                phoneNumberVisible: phoneNumberVisible ? 1 : 0,
                website: document.getElementById('form-website').value.trim() || null,
                instagram: document.getElementById('form-instagram').value.trim() || null,
                dribbble: document.getElementById('form-dribbble').value.trim() || null,
                behance: document.getElementById('form-behance').value.trim() || null,
                bluesky: document.getElementById('form-bluesky').value.trim() || null,
                twitter: document.getElementById('form-twitter').value.trim() || null,
                facebook: document.getElementById('form-facebook').value.trim() || null,
                youtube: document.getElementById('form-youtube').value.trim() || null,
            };

            const wasEditing = !!editingDesignerId;
            const btn = document.getElementById('submitBtn');
            btn.disabled = true;
            btn.textContent = wasEditing ? 'Saving...' : 'Submitting...';

            try {
                const method = editingDesignerId ? 'PUT' : 'POST';
                const endpoint = editingDesignerId ? \`/api/designers/\${editingDesignerId}\` : '/api/designers';

                const res = await fetch(endpoint, {
                    method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Submission failed.');

                if (wasEditing) {
                    closeModal();
                    fetchDesigners();
                    return;
                }

                document.getElementById('profileForm').reset();
                document.getElementById('hide-listing-btn').style.display = 'none';
                sessionId = null;
                editingDesignerId = null;
                pendingEditDesignerId = null;
                document.getElementById('step4-message').textContent = wasEditing
                    ? 'Your profile has been updated.'
                    : 'Your profile has been submitted for review. It will go live once approved.';
                goToStep(4);
            } catch (err) {
                showError(errorEl, err.message);
            } finally {
                btn.disabled = false;
                btn.textContent = wasEditing ? 'Save changes' : 'Submit profile';
            }
        }

        // Hide listing confirmation
        function openHideConfirm() {
            const errorEl = document.getElementById('hide-error');
            errorEl.style.display = 'none';
            errorEl.textContent = '';
            document.getElementById('hideConfirmModal').classList.add('active');
            syncModalOpenState();
        }
        function cancelHide() {
            document.getElementById('hideConfirmModal').classList.remove('active');
            syncModalOpenState();
        }
        async function confirmHide() {
            const errorEl = document.getElementById('hide-error');
            errorEl.style.display = 'none';
            const btn = document.getElementById('hide-confirm-btn');
            btn.disabled = true;
            btn.textContent = 'Hiding...';
            try {
                const res = await fetch('/api/designers/' + editingDesignerId + '/hide', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ sessionId })
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Failed to hide listing.');
                cancelHide();
                closeModal();
                fetchDesigners();
            } catch (err) {
                showError(errorEl, err.message);
            } finally {
                btn.disabled = false;
                btn.textContent = 'Yes, hide my listing';
            }
        }

        document.querySelectorAll('.modal-overlay').forEach(modal => {
            modal.addEventListener('click', event => {
                if (event.target !== modal) return;
                if (modal.id === 'filtersModal') closeFiltersModal();
                else if (modal.id === 'hideConfirmModal') cancelHide();
            });
        });

        document.addEventListener('keydown', event => {
            if (event.key !== 'Escape') return;
            if (document.getElementById('hideConfirmModal').classList.contains('active')) cancelHide();
            else if (document.getElementById('filtersModal').classList.contains('active')) closeFiltersModal();
        });

        // Boot
        populateCountryDropdowns();
        initUIFromURL();
        fetchDesigners();
    </script>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/** Cryptographically secure 9-digit OTP */
function generateOtp() {
    const buf = new Uint32Array(1);
    crypto.getRandomValues(buf);
    return String(100000000 + (buf[0] % 900000000));
}

/** SHA-256 hex digest */
async function hashValue(input) {
    const data = new TextEncoder().encode(input);
    const buf = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Send OTP email via Cloudflare Email Workers (send_email binding).
 * Bind the EMAIL service in wrangler.toml:
 *   [[send_email]]
 *   name = "EMAIL"
 * Update the from address to your verified sender domain.
 *
 * In development (no EMAIL binding), the code is only logged to the
 * wrangler dev console.
 */
async function sendEmail(env, to, code) {
    if (!env.EMAIL) {
        console.warn(`[DEV] OTP for ${to}: ${code} - bind EMAIL (send_email) to enable real email delivery.`);
        return;
    }

    const { EmailMessage } = await import('cloudflare:email');
    const from = 'otp@noreply.gdfinder.com';
    const subject = 'Your GDFinder verification code';
    const body = `Your verification code is: ${code.slice(0, 3)}-${code.slice(3, 6)}-${code.slice(6, 9)}\n\nThis code expires in 10 minutes.`;

    const messageId = `<${crypto.randomUUID()}@gdfinder>`;
    const raw = [
        `From: GDFinder <${from}>`,
        `To: ${to}`,
        `Message-ID: ${messageId}`,
        `Subject: ${subject}`,
        `MIME-Version: 1.0`,
        `Content-Type: text/plain; charset=utf-8`,
        ``,
        body
    ].join('\r\n');

    const message = new EmailMessage(from, to, raw);
    try {
        await env.EMAIL.send(message);
    } catch (err) {
        console.error('Email dispatch failed:', err);
        throw new Error('Failed to send verification email. Please try again later.');
    }
}

/** Return a JSON error response */
function jsonError(message, status = 400) {
    return new Response(JSON.stringify({ error: message }), {
        status,
        headers: { 'Content-Type': 'application/json' }
    });
}

/** Return a Basic Auth challenge response. */
function basicAuthRequired() {
    return new Response('Authentication required.', {
        status: 401,
        headers: {
            'WWW-Authenticate': 'Basic realm="GDFinder", charset="UTF-8"',
            'Cache-Control': 'no-store'
        }
    });
}

/** Check request credentials against the Worker secret bindings. */
function hasValidBasicAuth(request, env) {
    const authorization = request.headers.get('Authorization');
    if (!authorization?.startsWith('Basic ')) return false;

    try {
        const credentials = atob(authorization.slice(6));
        const separator = credentials.indexOf(':');
        if (separator === -1) return false;

        const username = credentials.slice(0, separator);
        const password = credentials.slice(separator + 1);

        return username === env.BASIC_AUTH_USERNAME
            && password === env.BASIC_AUTH_PASSWORD;
    } catch {
        return false;
    }
}

// ---------------------------------------------------------------------------
// Worker entry point
// ---------------------------------------------------------------------------

export default {
    async fetch(request, env, ctx) {
        if (env.BASIC_AUTH_ENABLED === 'true' && !hasValidBasicAuth(request, env)) {
            return basicAuthRequired();
        }

        const url = new URL(request.url);

        // ── Serve HTML shell ────────────────────────────────────────────────
        if (request.method === 'GET' && url.pathname === '/') {
            const countryHeader = request.headers.get('cf-ipcountry');
            const normalisedCountryHeader = countryHeader?.trim().toUpperCase() || '';
            const detectedCountryCode = ISO_COUNTRY_CODES.includes(normalisedCountryHeader)
                ? normalisedCountryHeader
                : '';
            return new Response(renderHtml(detectedCountryCode), {
                headers: { 'Content-Type': 'text/html; charset=utf-8' }
            });
        }

        // ── GET /api/headers ──────────────────────────────────────────────
        if (request.method === 'GET' && url.pathname === '/api/headers') {
            return new Response(JSON.stringify(Object.fromEntries(request.headers), null, 2), {
                headers: { 'Content-Type': 'application/json; charset=utf-8' }
            });
        }

        // ── GET /api/designers ──────────────────────────────────────────────
        if (request.method === 'GET' && url.pathname === '/api/designers') {
            const cacheKey = new Request(url.toString(), request);
            const cache = caches.default;
            const cached = await cache.match(cacheKey);
            if (cached) return cached;

            try {
                // Validated / sanitised params
                const q = url.searchParams.get('q') || '';
                const ai = Math.min(2, Math.max(0, parseInt(url.searchParams.get('ai') ?? '1', 10)));
                const requestedCountry = (url.searchParams.get('country') || '').toUpperCase();
                const country = ISO_COUNTRY_CODES.includes(requestedCountry) ? requestedCountry : 'All';
                const language = url.searchParams.get('language') || 'All';
                const sort = url.searchParams.get('sort') || 'scoreDesc';

                let sql = "SELECT * FROM designers WHERE status NOT IN ('suspended', 'hidden') AND ai_level <= ?";
                const params = [ai];

                if (country !== 'All') { sql += ' AND country_code = ?'; params.push(country); }
                if (language !== 'All') { sql += ' AND languages LIKE ?'; params.push(`%${language}%`); }
                if (q) {
                    sql += ' AND (LOWER(name) LIKE ? OR LOWER(categories) LIKE ?)';
                    const lq = `%${q.toLowerCase()}%`;
                    params.push(lq, lq);
                }

                const ORDER_BY = {
                    speed: ' ORDER BY turnaround_days ASC',
                    scoreAsc: ' ORDER BY (upvotes - downvotes) ASC',
                    scoreDesc: ' ORDER BY (upvotes - downvotes) DESC',
                    ratingAsc: ' ORDER BY (upvotes - downvotes) ASC',
                    ratingDesc: ' ORDER BY (upvotes - downvotes) DESC'
                };
                sql += ORDER_BY[sort] ?? ORDER_BY.scoreDesc;

                const { results } = await env.DB.prepare(sql).bind(...params).all();

                const formatted = results.map(row => ({
                    id: row.id,
                    name: row.name,
                    city: row.city,
                    countryCode: row.country_code,
                    languages: JSON.parse(row.languages),
                    categories: JSON.parse(row.categories),
                    turnaroundDays: row.turnaround_days,
                    aiLevel: row.ai_level,
                    upvotes: row.upvotes || 0,
                    score: (row.upvotes || 0) - (row.downvotes || 0),
                    avatarColor: row.avatar_color,
                    gravatarHash: row.gravatar_hash || null,
                }));

                const response = new Response(JSON.stringify(formatted), {
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 'public, max-age=60'
                    }
                });

                ctx.waitUntil(cache.put(cacheKey, response.clone()));
                return response;

            } catch (err) {
                console.error('GET /api/designers:', err);
                return jsonError('Internal server error', 500);
            }
        }

        // ── POST /api/otp/send ──────────────────────────────────────────────
        if (request.method === 'POST' && url.pathname === '/api/otp/send') {
            try {
                const body = await request.json().catch(() => ({}));
                const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
                if (!EMAIL_REGEX.test(email)) return jsonError('Invalid email address.');

                const code = generateOtp();
                const codeHash = await hashValue(`${code}:${email}`);
                const expiresAt = Math.floor(Date.now() / 1000) + 600; // 10 minutes

                await env.DB.prepare(
                    `INSERT INTO otps (email, code_hash, expires_at) VALUES (?, ?, ?)
                     ON CONFLICT(email) DO UPDATE SET code_hash = excluded.code_hash, expires_at = excluded.expires_at`
                ).bind(email, codeHash, expiresAt).run();

                await sendEmail(env, email, code);

                return new Response(JSON.stringify({ success: true }), {
                    headers: { 'Content-Type': 'application/json' }
                });
            } catch (err) {
                console.error('POST /api/otp/send:', err);
                return jsonError(err.message || 'Failed to send OTP.');
            }
        }

        // ── POST /api/otp/verify ────────────────────────────────────────────
        if (request.method === 'POST' && url.pathname === '/api/otp/verify') {
            try {
                const body = await request.json().catch(() => ({}));
                const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
                const raw_code = typeof body.code === 'string' ? body.code.trim() : '';
                const code = raw_code.replace(/\D/g, ''); // Remove non-digits

                if (!EMAIL_REGEX.test(email)) return jsonError('Invalid email address.');

                const otpRow = await env.DB.prepare('SELECT * FROM otps WHERE email = ?').bind(email).first();
                if (!otpRow) return jsonError('No verification code was requested for this email.');

                const now = Math.floor(Date.now() / 1000);
                if (otpRow.expires_at < now) return jsonError('Verification code has expired. Please request a new one.');

                const submittedHash = await hashValue(`${code}:${email}`);
                if (submittedHash !== otpRow.code_hash) return jsonError('Incorrect verification code.');

                const sessionUuid = crypto.randomUUID();
                const challengeHash = await hashValue(sessionUuid);

                const designer = await env.DB.prepare('SELECT * FROM designers WHERE email = ?').bind(email).first();

                if (designer) {
                    await env.DB.batch([
                        env.DB.prepare('DELETE FROM otps WHERE email = ?').bind(email),
                        env.DB.prepare('UPDATE designers SET last_challenge = ?, last_challenge_time = ? WHERE id = ?')
                            .bind(challengeHash, now, designer.id)
                    ]);

                    return new Response(JSON.stringify({
                        sessionId: sessionUuid,
                        designer: {
                            id: designer.id,
                            name: designer.name,
                            listingType: designer.listing_type,
                            bio: designer.bio,
                            availability: designer.availability,
                            city: designer.city,
                            countryCode: designer.country_code,
                            languages: JSON.parse(designer.languages),
                            categories: JSON.parse(designer.categories),
                            turnaroundDays: designer.turnaround_days,
                            aiLevel: designer.ai_level,
                            priceRange: designer.price_range,
                            pricingStructure: designer.pricing_structure,
                            preferredClient: designer.preferred_client,
                            emailShown: designer.email_shown,
                            phoneNumber: designer.phone_number,
                            phoneNumberVisible: designer.phone_number_visible,
                            website: designer.website,
                            instagram: designer.instagram,
                            dribbble: designer.dribbble,
                            behance: designer.behance,
                            bluesky: designer.bluesky,
                            twitter: designer.twitter,
                            facebook: designer.facebook,
                            youtube: designer.youtube,
                        }
                    }), { headers: { 'Content-Type': 'application/json' } });
                } else {
                    const expiresAt = now + 1800;
                    await env.DB.batch([
                        env.DB.prepare('DELETE FROM otps WHERE email = ?').bind(email),
                        env.DB.prepare('INSERT INTO sessions (challenge_hash, email, expires_at) VALUES (?, ?, ?)')
                            .bind(challengeHash, email, expiresAt)
                    ]);

                    return new Response(JSON.stringify({ sessionId: sessionUuid, designer: null }), {
                        headers: { 'Content-Type': 'application/json' }
                    });
                }
            } catch (err) {
                console.error('POST /api/otp/verify:', err);
                return jsonError(err.message || 'Verification failed.', 500);
            }
        }

        // ── POST /api/designers ─────────────────────────────────────────────
        if (request.method === 'POST' && url.pathname === '/api/designers') {
            try {
                const data = await request.json().catch(() => ({}));
                const { sessionId, name, listingType, bio, availability, city, countryCode, categories, languages,
                    turnaroundDays, aiLevel, priceRange, pricingStructure, preferredClient,
                    emailShown, phoneNumber, phoneNumberVisible,
                    website, instagram, dribbble, behance, bluesky, twitter, facebook, youtube } = data;

                if (typeof sessionId !== 'string' || !sessionId) return jsonError('Missing session.');
                const challengeHash = await hashValue(sessionId);

                const now = Math.floor(Date.now() / 1000);
                const session = await env.DB.prepare('SELECT * FROM sessions WHERE challenge_hash = ?').bind(challengeHash).first();
                if (!session) return jsonError('Invalid or expired session.');
                if (session.expires_at < now) {
                    await env.DB.prepare('DELETE FROM sessions WHERE challenge_hash = ?').bind(challengeHash).run();
                    return jsonError('Session has expired. Please start again.');
                }

                const email = session.email;
                const cleanCountryCode = typeof countryCode === 'string' ? countryCode.trim().toUpperCase() : '';
                const isEmailShown = emailShown === true || emailShown === 1;
                const isPhoneNumberVisible = phoneNumberVisible === true || phoneNumberVisible === 1;

                if (typeof name !== 'string' || name.trim().length < 2) throw new Error('Name is required.');
                if (typeof city !== 'string' || city.trim().length < 1) throw new Error('City is required.');
                if (!ISO_COUNTRY_CODES.includes(cleanCountryCode)) throw new Error('Please select a valid country.');
                if (!Array.isArray(languages) || languages.length === 0) throw new Error('At least one language is required.');
                if (!Array.isArray(categories) || categories.length === 0) throw new Error('At least one category is required.');
                if (!Number.isInteger(turnaroundDays) || turnaroundDays < 1 || turnaroundDays > 365) throw new Error('Turnaround must be 1-365 days.');
                if (![0, 1, 2].includes(aiLevel)) throw new Error('Invalid AI level.');
                if (isPhoneNumberVisible && (typeof phoneNumber !== 'string' || !phoneNumber.trim())) {
                    throw new Error('Phone number is required when it is shown on the listing.');
                }

                const COLORS = ['#e67e5d', '#f4c27f', '#88c0a2', '#a388c0', '#e38c92'];
                const avatarColor = COLORS[Math.floor(Math.random() * COLORS.length)];
                const gravatarHash = await hashValue(email);
                const designerId = crypto.randomUUID();

                const cleanLanguages = languages.map(l => String(l).trim().slice(0, 50)).filter(Boolean).slice(0, 10);
                const cleanCategories = categories.map(c => String(c).trim().slice(0, 50)).filter(Boolean).slice(0, 10);

                await env.DB.batch([
                    env.DB.prepare('DELETE FROM sessions WHERE challenge_hash = ?').bind(challengeHash),
                    env.DB.prepare(`
                        INSERT INTO designers (
                            id, name, listing_type, bio, availability, city, country_code,
                            email, email_shown, phone_number, phone_number_visible,
                            languages, categories, turnaround_days, ai_level,
                            price_range, pricing_structure, preferred_client,
                            website, instagram, dribbble, behance, bluesky, twitter, facebook, youtube,
                            gravatar_hash, avatar_color, status
                        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    `).bind(
                        designerId,
                        name.trim().slice(0, 100),
                        listingType || 'freelancer',
                        bio ? String(bio).trim().slice(0, 300) : null,
                        availability || 'available',
                        city.trim().slice(0, 100),
                        cleanCountryCode,
                        email,
                        isEmailShown ? 1 : 0,
                        phoneNumber ? String(phoneNumber).trim().slice(0, 30) : null,
                        isPhoneNumberVisible ? 1 : 0,
                        JSON.stringify(cleanLanguages),
                        JSON.stringify(cleanCategories),
                        turnaroundDays,
                        aiLevel,
                        priceRange || null,
                        pricingStructure ? String(pricingStructure).trim().slice(0, 150) : null,
                        preferredClient ? String(preferredClient).trim().slice(0, 150) : null,
                        website ? String(website).trim().slice(0, 255) : null,
                        instagram ? String(instagram).trim().slice(0, 100) : null,
                        dribbble ? String(dribbble).trim().slice(0, 100) : null,
                        behance ? String(behance).trim().slice(0, 100) : null,
                        bluesky ? String(bluesky).trim().slice(0, 100) : null,
                        twitter ? String(twitter).trim().slice(0, 100) : null,
                        facebook ? String(facebook).trim().slice(0, 100) : null,
                        youtube ? String(youtube).trim().slice(0, 255) : null,
                        gravatarHash,
                        avatarColor,
                        'pending'
                    )
                ]);

                return new Response(JSON.stringify({ success: true }), {
                    headers: { 'Content-Type': 'application/json' }
                });
            } catch (err) {
                console.error('POST /api/designers:', err);
                return jsonError(err.message || 'Submission failed.');
            }
        }

        // ── PUT /api/designers/:id ──────────────────────────────────────────
        const putMatch = url.pathname.match(/^\/api\/designers\/([0-9a-f-]+)$/i);
        if (request.method === 'PUT' && putMatch) {
            try {
                const designerId = putMatch[1];
                const data = await request.json().catch(() => ({}));
                const { sessionId, name, listingType, bio, availability, city, countryCode, categories, languages,
                    turnaroundDays, aiLevel, priceRange, pricingStructure, preferredClient,
                    emailShown, phoneNumber, phoneNumberVisible,
                    website, instagram, dribbble, behance, bluesky, twitter, facebook, youtube } = data;

                if (typeof sessionId !== 'string' || !sessionId) return jsonError('Missing session.');

                const designer = await env.DB.prepare('SELECT * FROM designers WHERE id = ?').bind(designerId).first();
                if (!designer) return jsonError('Designer not found.', 404);

                const challengeHash = await hashValue(sessionId);
                if (designer.last_challenge !== challengeHash) return jsonError('Invalid session.');

                const now = Math.floor(Date.now() / 1000);
                if (!designer.last_challenge_time || (now - designer.last_challenge_time) > 1800) {
                    return jsonError('Session has expired. Please start again.');
                }

                const cleanCountryCode = typeof countryCode === 'string' ? countryCode.trim().toUpperCase() : '';
                const isEmailShown = emailShown === true || emailShown === 1;
                const isPhoneNumberVisible = phoneNumberVisible === true || phoneNumberVisible === 1;

                if (typeof name !== 'string' || name.trim().length < 2) throw new Error('Name is required.');
                if (typeof city !== 'string' || city.trim().length < 1) throw new Error('City is required.');
                if (!ISO_COUNTRY_CODES.includes(cleanCountryCode)) throw new Error('Please select a valid country.');
                if (!Array.isArray(languages) || languages.length === 0) throw new Error('At least one language is required.');
                if (!Array.isArray(categories) || categories.length === 0) throw new Error('At least one category is required.');
                if (!Number.isInteger(turnaroundDays) || turnaroundDays < 1 || turnaroundDays > 365) throw new Error('Turnaround must be 1-365 days.');
                if (![0, 1, 2].includes(aiLevel)) throw new Error('Invalid AI level.');
                if (isPhoneNumberVisible && (typeof phoneNumber !== 'string' || !phoneNumber.trim())) {
                    throw new Error('Phone number is required when it is shown on the listing.');
                }

                const cleanLanguages = languages.map(l => String(l).trim().slice(0, 50)).filter(Boolean).slice(0, 10);
                const cleanCategories = categories.map(c => String(c).trim().slice(0, 50)).filter(Boolean).slice(0, 10);

                await env.DB.prepare(`
                    UPDATE designers SET
                        name = ?, listing_type = ?, bio = ?, availability = ?,
                        city = ?, country_code = ?,
                        email_shown = ?, phone_number = ?, phone_number_visible = ?,
                        languages = ?, categories = ?, turnaround_days = ?, ai_level = ?,
                        price_range = ?, pricing_structure = ?, preferred_client = ?,
                        website = ?, instagram = ?, dribbble = ?, behance = ?,
                        bluesky = ?, twitter = ?, facebook = ?, youtube = ?,
                        last_challenge = NULL, last_challenge_time = NULL,
                        updated_at = CURRENT_TIMESTAMP
                    WHERE id = ?
                `).bind(
                    name.trim().slice(0, 100),
                    listingType || 'freelancer',
                    bio ? String(bio).trim().slice(0, 300) : null,
                    availability || 'available',
                    city.trim().slice(0, 100),
                    cleanCountryCode,
                    isEmailShown ? 1 : 0,
                    phoneNumber ? String(phoneNumber).trim().slice(0, 30) : null,
                    isPhoneNumberVisible ? 1 : 0,
                    JSON.stringify(cleanLanguages),
                    JSON.stringify(cleanCategories),
                    turnaroundDays,
                    aiLevel,
                    priceRange || null,
                    pricingStructure ? String(pricingStructure).trim().slice(0, 150) : null,
                    preferredClient ? String(preferredClient).trim().slice(0, 150) : null,
                    website ? String(website).trim().slice(0, 255) : null,
                    instagram ? String(instagram).trim().slice(0, 100) : null,
                    dribbble ? String(dribbble).trim().slice(0, 100) : null,
                    behance ? String(behance).trim().slice(0, 100) : null,
                    bluesky ? String(bluesky).trim().slice(0, 100) : null,
                    twitter ? String(twitter).trim().slice(0, 100) : null,
                    facebook ? String(facebook).trim().slice(0, 100) : null,
                    youtube ? String(youtube).trim().slice(0, 255) : null,
                    designerId
                ).run();

                return new Response(JSON.stringify({ success: true }), {
                    headers: { 'Content-Type': 'application/json' }
                });
            } catch (err) {
                console.error(`PUT /api/designers/${putMatch[1]}:`, err);
                return jsonError(err.message || 'Update failed.');
            }
        }

        // ── POST /api/designers/:id/hide ────────────────────────────────────
        const hideMatch = url.pathname.match(/^\/api\/designers\/([0-9a-f-]+)\/hide$/i);
        if (request.method === 'POST' && hideMatch) {
            try {
                const designerId = hideMatch[1];
                const data = await request.json().catch(() => ({}));
                const { sessionId } = data;

                if (typeof sessionId !== 'string' || !sessionId) return jsonError('Missing session.');

                const designer = await env.DB.prepare('SELECT * FROM designers WHERE id = ?').bind(designerId).first();
                if (!designer) return jsonError('Designer not found.', 404);

                const challengeHash = await hashValue(sessionId);
                if (designer.last_challenge !== challengeHash) return jsonError('Invalid session.');

                const now = Math.floor(Date.now() / 1000);
                if (!designer.last_challenge_time || (now - designer.last_challenge_time) > 1800) {
                    return jsonError('Session has expired. Please start again.');
                }

                await env.DB.prepare(`
                    UPDATE designers SET
                        status = 'hidden',
                        last_challenge = NULL,
                        last_challenge_time = NULL,
                        updated_at = CURRENT_TIMESTAMP
                    WHERE id = ?
                `).bind(designerId).run();

                return new Response(JSON.stringify({ success: true }), {
                    headers: { 'Content-Type': 'application/json' }
                });
            } catch (err) {
                console.error('POST /api/designers/' + hideMatch[1] + '/hide:', err);
                return jsonError(err.message || 'Failed to hide listing.');
            }
        }

        return new Response('Not Found', { status: 404 });
    }
};
