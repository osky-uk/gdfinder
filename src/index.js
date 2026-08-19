const HTML_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GDFinder - Graphic Designer Finder</title>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-color: #fdfaf6;
            --surface-color: #ffffff;
            --text-main: #4a403a;
            --text-light: #8c7e77;
            --accent-primary: #e67e5d;
            --accent-hover: #d26a4a;
            --accent-secondary: #f4c27f;
            --border-color: #eee6df;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Nunito', sans-serif; }
        body { background-color: var(--bg-color); color: var(--text-main); display: flex; flex-direction: column; min-height: 100vh; }

        /* Header & Search */
        header { background-color: var(--surface-color); padding: 40px 20px; text-align: center; border-bottom: 1px solid var(--border-color); box-shadow: 0 4px 20px rgba(0,0,0,0.02); border-radius: 0 0 40px 40px; margin-bottom: 30px; }
        h1 { font-size: 2.5rem; color: var(--accent-primary); margin-bottom: 10px; font-weight: 800; }
        header p { color: var(--text-light); font-size: 1.1rem; margin-bottom: 30px; }
        
        .search-container { max-width: 800px; margin: 0 auto; position: relative; }
        .search-bar { width: 100%; padding: 18px 25px; font-size: 1.1rem; border: 2px solid var(--border-color); border-radius: 999px; outline: none; transition: all 0.3s ease; box-shadow: 0 4px 10px rgba(0,0,0,0.02); color: var(--text-main); }
        .search-bar:focus { border-color: var(--accent-primary); box-shadow: 0 4px 15px rgba(230, 126, 93, 0.15); }

        /* Filters */
        .filters-wrapper { max-width: 1200px; margin: 0 auto; padding: 25px; background: var(--surface-color); border-radius: 40px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); border: 1px solid var(--border-color); display: flex; flex-direction: column; gap: 20px; }
        .filters-top-row { display: flex; flex-wrap: wrap; gap: 20px; align-items: center; justify-content: space-between; }
        .filters-bottom-row { border-top: 1px dashed var(--border-color); padding-top: 25px; display: flex; justify-content: center; }
        .filter-group { display: flex; align-items: center; gap: 10px; }
        .filter-group label { font-weight: 700; color: var(--text-main); font-size: 0.95rem; }
        
        select { appearance: none; padding: 10px 35px 10px 15px; border: 1px solid var(--border-color); border-radius: 999px; background-color: var(--bg-color); color: var(--text-main); font-size: 0.95rem; cursor: pointer; outline: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%234a403a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 15px center; }

        /* AI Slider */
        .ai-slider-container { display: flex; align-items: flex-start; gap: 20px; background: var(--bg-color); padding: 20px; border-radius: 30px; border: 1px solid var(--border-color); width: 100%; max-width: 800px; flex-direction: column; }
        .slider-header { display: flex; align-items: center; gap: 15px; width: 100%; }
        .slider-header label { font-weight: 800; white-space: nowrap; }
        .slider-wrapper { flex-grow: 1; display: flex; flex-direction: column; position: relative; width: 100%; }
        input[type=range] { -webkit-appearance: none; width: 100%; background: transparent; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; height: 22px; width: 22px; border-radius: 50%; background: var(--accent-primary); cursor: pointer; margin-top: -8px; box-shadow: 0 2px 6px rgba(0,0,0,0.2); transition: background 0.2s; }
        input[type=range]::-webkit-slider-runnable-track { width: 100%; height: 6px; cursor: pointer; background: var(--border-color); border-radius: 999px; }
        .slider-labels { display: flex; justify-content: space-between; margin-top: 8px; font-size: 0.85rem; color: var(--text-light); font-weight: 600; }
        .slider-labels span { cursor: pointer; transition: color 0.2s; }
        .slider-labels span.active { color: var(--accent-primary); font-weight: 800; }

        .ai-notification { margin-top: 15px; padding: 12px 20px; border-radius: 999px; font-size: 0.9rem; font-weight: 700; text-align: center; width: 100%; transition: all 0.3s ease; }
        .msg-green { background-color: #d4edda; color: #155724; }
        .msg-amber { background-color: #fff3cd; color: #856404; }
        .msg-red { background-color: #f8d7da; color: #721c24; border-radius: 20px; }

        /* Main Grid */
        main { flex-grow: 1; max-width: 1200px; margin: 40px auto; padding: 0 20px; width: 100%; }
        .results-header { display: flex; align-items: center; gap: 15px; margin-bottom: 20px; }
        .results-count { font-weight: 600; color: var(--text-light); }
        .add-link { color: var(--accent-primary); font-weight: 800; text-decoration: none; padding-left: 15px; border-left: 2px solid var(--border-color); transition: color 0.2s; }
        .add-link:hover { color: var(--accent-hover); text-decoration: underline; }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 30px; }

        /* Cards */
        .card { background: var(--surface-color); border-radius: 30px; padding: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); border: 1px solid var(--border-color); transition: transform 0.2s ease, box-shadow 0.2s ease; display: flex; flex-direction: column; gap: 15px; position: relative; }
        .card:hover { transform: translateY(-5px); box-shadow: 0 10px 25px rgba(0,0,0,0.06); }
        .card-header { display: flex; gap: 15px; align-items: center; }
        .avatar { width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 800; color: var(--surface-color); text-transform: uppercase; }
        .info h2 { font-size: 1.3rem; color: var(--text-main); margin-bottom: 3px; }
        .location { font-size: 0.85rem; color: var(--text-light); display: flex; align-items: center; gap: 4px; }
        .stats { display: flex; justify-content: space-between; align-items: center; background: var(--bg-color); padding: 12px 15px; border-radius: 20px; font-size: 0.9rem; }
        .rating { font-weight: 800; color: #f5a623; display: flex; align-items: center; gap: 5px; }
        .turnaround { color: var(--text-main); font-weight: 600; font-size: 0.85rem; }
        .categories { display: flex; flex-wrap: wrap; gap: 8px; }
        .tag { background: var(--bg-color); border: 1px solid var(--border-color); color: var(--text-main); padding: 4px 12px; border-radius: 999px; font-size: 0.8rem; font-weight: 600; }
        .language-tag { font-size: 0.8rem; color: var(--text-light); margin-top: 5px; }
        
        .ai-status { display: inline-block; padding: 6px 14px; border-radius: 999px; font-size: 0.8rem; font-weight: 800; text-align: center; margin-top: auto; }
        .ai-0 { background: rgba(136, 192, 162, 0.2); color: #437d61; }
        .ai-1 { background: rgba(244, 194, 127, 0.25); color: #9c6c1d; }
        .ai-2 { background: rgba(227, 140, 146, 0.2); color: #9c3c45; }

        .btn-main { width: 100%; padding: 12px; border: none; border-radius: 999px; background: var(--accent-primary); color: white; font-size: 1rem; font-weight: 700; cursor: pointer; transition: background 0.3s; margin-top: 10px; }
        .btn-main:hover:not(:disabled) { background: var(--accent-hover); }
        .btn-main:disabled { opacity: 0.6; cursor: not-allowed; }

        .empty-state { grid-column: 1 / -1; text-align: center; padding: 50px; color: var(--text-light); font-size: 1.2rem; background: var(--surface-color); border-radius: 30px; border: 1px dashed var(--border-color); }

        /* Loading Spinner */
        .loader-container { grid-column: 1 / -1; display: flex; justify-content: center; padding: 40px; }
        .loader { border: 4px solid var(--border-color); border-top: 4px solid var(--accent-primary); border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

        /* Footer */
        footer { background: var(--surface-color); padding: 40px 20px; text-align: center; border-top: 1px solid var(--border-color); margin-top: auto; }
        .footer-btn { background: var(--bg-color); border: 2px solid var(--accent-primary); color: var(--accent-primary); padding: 12px 30px; font-size: 1.1rem; font-weight: 800; border-radius: 999px; cursor: pointer; transition: all 0.3s ease; }
        .footer-btn:hover { background: var(--accent-primary); color: white; }

        /* Modal */
        .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(74, 64, 58, 0.6); display: none; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(4px); }
        .modal-overlay.active { display: flex; }
        .modal-content { background: var(--surface-color); padding: 40px; border-radius: 40px; max-width: 600px; width: 90%; box-shadow: 0 20px 50px rgba(0,0,0,0.15); position: relative; max-height: 90vh; overflow-y: auto; }
        .modal-close { position: absolute; top: 20px; right: 25px; font-size: 1.8rem; cursor: pointer; color: var(--text-light); border: none; background: none; transition: color 0.2s; }
        .modal-close:hover { color: var(--text-main); }
        .modal-step { display: none; }
        .modal-step.active { display: block; animation: fadeIn 0.3s ease; }
        
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .modal-step h2 { color: var(--accent-primary); margin-bottom: 20px; font-size: 1.8rem; }
        .modal-step ul { margin: 15px 0 20px 20px; line-height: 1.6; color: var(--text-main); }
        .form-group { margin-bottom: 15px; }
        .form-group input, .form-group select { width: 100%; padding: 15px 20px; border: 2px solid var(--border-color); border-radius: 999px; font-size: 1rem; outline: none; background: var(--bg-color); color: var(--text-main); transition: border-color 0.3s; }
        .form-group input:focus, .form-group select:focus { border-color: var(--accent-primary); }
        .form-group textarea { width: 100%; padding: 15px 20px; border: 2px solid var(--border-color); border-radius: 20px; font-size: 1rem; outline: none; background: var(--bg-color); color: var(--text-main); transition: border-color 0.3s; resize: vertical; font-family: 'Nunito', sans-serif; }
        .form-group textarea:focus { border-color: var(--accent-primary); }
        .form-group.check-group { display: flex; align-items: center; gap: 10px; }
        .form-group.check-group input[type="checkbox"] { width: auto; padding: 0; flex-shrink: 0; cursor: pointer; }
        .form-group.check-group label { cursor: pointer; }
        .inline-error { color: #e38c92; font-size: 0.9rem; font-weight: 700; margin-bottom: 10px; display: none; }
        .btn-secondary { width: 100%; padding: 10px; border: 2px solid var(--border-color); border-radius: 999px; background: transparent; color: var(--text-light); font-size: 0.95rem; font-weight: 700; cursor: pointer; transition: all 0.2s; margin-top: 8px; }
        .btn-secondary:hover { border-color: var(--accent-primary); color: var(--accent-primary); }
        .btn-danger { width: 100%; padding: 10px; border: 2px solid #e38c92; border-radius: 999px; background: transparent; color: #9c3c45; font-size: 0.95rem; font-weight: 700; cursor: pointer; transition: all 0.2s; margin-top: 8px; }
        .btn-danger:hover { background: #f8d7da; }
        .btn-danger:disabled { opacity: 0.6; cursor: not-allowed; }
        .edit-btn { position: absolute; top: 15px; right: 15px; width: 30px; height: 30px; border: 1px solid var(--border-color); background: var(--surface-color); border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--text-light); font-size: 0.85rem; transition: all 0.2s; padding: 0; line-height: 1; }
        .edit-btn:hover { background: var(--bg-color); border-color: var(--accent-primary); color: var(--accent-primary); }
        .avatar-img { width: 60px; height: 60px; border-radius: 50%; object-fit: cover; flex-shrink: 0; }
        .form-email-display { background: var(--bg-color); border: 1px solid var(--border-color); border-radius: 999px; padding: 8px 18px; font-size: 0.9rem; color: var(--text-light); font-weight: 700; margin-bottom: 18px; text-align: center; }
        .agreement { margin: 15px 0 20px; display: flex; flex-direction: column; gap: 10px; }
        .agreement label { display: flex; align-items: center; gap: 10px; cursor: pointer; font-size: 0.95rem; }
        .agreement input[type="checkbox"] { width: auto; flex-shrink: 0; cursor: pointer; }
        .accordion { border: 1px solid var(--border-color); border-radius: 20px; margin-bottom: 10px; overflow: hidden; }
        .accordion summary { padding: 14px 20px; font-weight: 700; cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; background: var(--bg-color); }
        .accordion summary::-webkit-details-marker { display: none; }
        .accordion summary::after { content: '›'; font-size: 1.4rem; color: var(--text-light); transition: transform 0.2s; display: inline-block; }
        .accordion[open] summary::after { transform: rotate(90deg); }
        .accordion > div { padding: 15px 20px 5px; }
    </style>
</head>
<body>

    <header>
        <h1>GDFinder</h1>
        <p>Connecting you with top creators for flyers, posters, logos, and more.</p>
        <div class="search-container">
            <input type="text" id="searchInput" class="search-bar" placeholder="Search by name, category (e.g. Logo, Flyer, Poster)...">
        </div>
    </header>

    <div class="filters-wrapper">
        <div class="filters-top-row">
            <div class="filter-group">
                <label for="locationFilter">Location:</label>
                <select id="locationFilter">
                    <option value="All">All Locations</option>
                </select>
            </div>

            <div class="filter-group">
                <label for="languageFilter">Language:</label>
                <select id="languageFilter">
                    <option value="All">All Languages</option>
                </select>
            </div>

            <div class="filter-group">
                <label for="sortOrder">Sort By:</label>
                <select id="sortOrder">
                    <option value="ratingDesc">Rating: High to Low</option>
                    <option value="ratingAsc">Rating: Low to High</option>
                    <option value="speed">Fastest Turnaround</option>
                </select>
            </div>
        </div>
        
        <div class="filters-bottom-row">
            <div class="ai-slider-container">
                <div class="slider-header">
                    <label>Max AI Level:</label>
                    <div class="slider-wrapper">
                        <input type="range" id="aiSlider" min="0" max="2" value="2" step="1">
                        <div class="slider-labels">
                            <span id="label-ai-0">No AI</span>
                            <span id="label-ai-1">AI Assisted</span>
                            <span id="label-ai-2" class="active">AI Generated</span>
                        </div>
                    </div>
                </div>
                <div id="aiNotification" class="ai-notification msg-red">
                    AI generated graphics often look low-effort. We recommend lower AI use.
                </div>
            </div>
        </div>
    </div>

    <main>
        <div class="results-header">
            <div class="results-count" id="resultsCount">Loading designers...</div>
            <a href="javascript:void(0)" onclick="openModal()" class="add-link">+ Add yourself</a>
        </div>
        
        <div class="grid" id="designersGrid">
            <div class="loader-container"><div class="loader"></div></div>
        </div>
    </main>

    <footer>
        <button class="footer-btn" onclick="openModal()">Add a Graphic Designer</button>
    </footer>

    <!-- Add/Edit Designer Modal -->
    <div class="modal-overlay" id="designerModal">
        <div class="modal-content">
            <button class="modal-close" onclick="closeModal()">&times;</button>

            <div class="modal-step active" id="step-1">
                <h2>Join GDFinder</h2>
                <p class="inline-error" id="step1-error"></p>
                <div class="form-group">
                    <input type="email" id="form-email" placeholder="Your email address">
                </div>
                <div class="agreement" id="step1-agreements">
                    <label><input type="checkbox" id="agree-real"> I will use my real name.</label>
                    <label><input type="checkbox" id="agree-ai"> I will correctly label my AI use.</label>
                    <label><input type="checkbox" id="agree-ban"> I understand that incorrect labelling results in a ban.</label>
                </div>
                <button class="btn-main" onclick="sendOtp()">Send verification code</button>
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
                            <div class="form-group"><input type="text" id="form-country-code" placeholder="Country code (e.g. GB)" required maxlength="2" oninput="this.value=this.value.toUpperCase()"></div>
                        </div>
                    </details>
                    <details class="accordion">
                        <summary>Work</summary>
                        <div>
                            <div class="form-group"><input type="text" id="form-cats" placeholder="Categories (e.g. Logos, Flyers)" required></div>
                            <div class="form-group"><input type="text" id="form-langs" placeholder="Languages (e.g. English, French)" required></div>
                            <div class="form-group"><input type="number" id="form-turnaround" placeholder="Avg turnaround (days)" required min="1" max="365"></div>
                            <div class="form-group">
                                <select id="form-ai" required>
                                    <option value="" disabled selected>Select AI use level</option>
                                    <option value="0">No AI (human only)</option>
                                    <option value="1">AI assisted (ideation, textures)</option>
                                    <option value="2">AI generated (prompts, direct renders)</option>
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
                            <div class="form-group"><input type="text" id="form-phone" placeholder="Phone number"></div>
                            <div class="form-group check-group"><input type="checkbox" id="form-phone-visible"><label for="form-phone-visible">Show phone number on listing</label></div>
                        </div>
                    </details>
                    <details class="accordion">
                        <summary>Links &amp; Social</summary>
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
                <h2>All done!</h2>
                <p id="step4-message">Your profile has been submitted for review. It will go live once approved.</p>
                <br>
                <button class="btn-main" onclick="closeModal(); fetchDesigners();">View directory</button>
            </div>
        </div>
    </div>

    <!-- Hide listing confirmation modal -->
    <div class="modal-overlay" id="hideConfirmModal">
        <div class="modal-content" style="max-width: 420px; text-align: center;">
            <h2 style="color: #9c3c45; margin-bottom: 15px; font-size: 1.5rem;">Hide your listing?</h2>
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
        const languageFilter = document.getElementById('languageFilter');
        const sortOrder = document.getElementById('sortOrder');
        const designersGrid = document.getElementById('designersGrid');
        const resultsCount = document.getElementById('resultsCount');
        const aiNotification = document.getElementById('aiNotification');
        const sliderLabels = [
            document.getElementById('label-ai-0'),
            document.getElementById('label-ai-1'),
            document.getElementById('label-ai-2')
        ];

        const aiMessages = [
            { text: "Thanks for choosing human-made work!", cls: "msg-green" },
            { text: "Consider choosing no AI and supporting human-made work", cls: "msg-amber" },
            { text: "AI generated graphics often look low-effort. We recommend human-made work.", cls: "msg-red" }
        ];

        let sessionId = null;
        let editingDesignerId = null;
        let pendingEditDesignerId = null;

        // Read URL params and set initial UI state
        function initUIFromURL() {
            const params = new URLSearchParams(window.location.search);
            if (params.has('q')) searchInput.value = params.get('q');
            if (params.has('ai')) aiSlider.value = params.get('ai');
            if (params.has('sort')) sortOrder.value = params.get('sort');
            // location and language are populated after initial fetch
            updateSliderUI();
        }

        // Update URL based on UI state to enable Edge Caching
        function updateURL() {
            const params = new URLSearchParams();
            if (searchInput.value) params.set('q', searchInput.value);
            params.set('ai', aiSlider.value);
            if (locationFilter.value !== 'All') params.set('city', locationFilter.value);
            if (languageFilter.value !== 'All') params.set('language', languageFilter.value);
            params.set('sort', sortOrder.value);
            
            window.history.replaceState({}, '', '?' + params.toString());
            fetchDesigners();
        }

        function updateSliderUI() {
            const val = parseInt(aiSlider.value, 10);
            sliderLabels.forEach((lbl, idx) => lbl.className = idx === val ? 'active' : '');
            aiNotification.textContent = aiMessages[val].text;
            aiNotification.className = 'ai-notification ' + aiMessages[val].cls;
        }

        function populateDropdowns(data) {
            const currentLoc = locationFilter.value;
            const currentLang = languageFilter.value;

            const cities = [...new Set(data.map(d => d.city))].filter(Boolean).sort();
            const languages = [...new Set(data.flatMap(d => d.languages))].sort();

            locationFilter.innerHTML = '<option value="All">All Locations</option>';
            cities.forEach(city => locationFilter.innerHTML += \`<option value="\${escapeHtml(city)}">\${escapeHtml(city)}</option>\`);
            
            languageFilter.innerHTML = '<option value="All">All Languages</option>';
            languages.forEach(lang => languageFilter.innerHTML += \`<option value="\${escapeHtml(lang)}">\${escapeHtml(lang)}</option>\`);

            // Restore selection if valid
            if (cities.includes(currentLoc)) locationFilter.value = currentLoc;
            else {
                const urlParams = new URLSearchParams(window.location.search);
                if (urlParams.has('city')) locationFilter.value = urlParams.get('city');
            }
            if (languages.includes(currentLang)) languageFilter.value = currentLang;
            else {
                const urlParams = new URLSearchParams(window.location.search);
                if (urlParams.has('language')) languageFilter.value = urlParams.get('language');
            }
        }

        function getInitials(name) { return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2); }
        function getAiStatusLabel(level) {
            if (level === 0) return { text: "No AI Used", cls: "ai-0" };
            if (level === 1) return { text: "AI Assisted", cls: "ai-1" };
            return { text: "AI Generated", cls: "ai-2" };
        }

        // Fetch filtered data directly using query strings (Cached by CDN)
        async function fetchDesigners() {
            designersGrid.innerHTML = '<div class="loader-container"><div class="loader"></div></div>';
            try {
                const response = await fetch('/api/designers' + window.location.search);
                if (!response.ok) throw new Error('Server error');
                const data = await response.json();
                
                populateDropdowns(data);
                
                resultsCount.textContent = \`Showing \${data.length} designer\${data.length !== 1 ? 's' : ''}\`;
                
                if (data.length === 0) {
                    designersGrid.innerHTML = '<div class="empty-state">No designers found matching your criteria. Try adjusting your filters!</div>';
                    return;
                }

                designersGrid.innerHTML = data.map(designer => {
                    const aiStatus = getAiStatusLabel(designer.aiLevel);
                    const cats = designer.categories.map(c => \`<span class="tag">\${escapeHtml(c)}</span>\`).join('');
                    const location = designer.city + (designer.countryCode ? ', ' + designer.countryCode : '');
                    const avatarHtml = designer.gravatarHash
                        ? \`<div style="flex-shrink:0"><img class="avatar-img" src="https://www.gravatar.com/avatar/\${escapeHtml(designer.gravatarHash)}?d=404&s=120" alt="" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="avatar" style="background-color:\${escapeHtml(designer.avatarColor)};display:none">\${getInitials(designer.name)}</div></div>\`
                        : \`<div class="avatar" style="background-color:\${escapeHtml(designer.avatarColor)}">\${getInitials(designer.name)}</div>\`;
                    return \`
                        <div class="card">
                            <button class="edit-btn" onclick="openModalForEdit('\${escapeHtml(designer.id)}')" title="Edit listing">✏️</button>
                            <div class="card-header">
                                \${avatarHtml}
                                <div class="info">
                                    <h2>\${escapeHtml(designer.name)}</h2>
                                    <div class="location">🌍 \${escapeHtml(location)}</div>
                                </div>
                            </div>
                            <div class="categories">\${cats}</div>
                            <div class="language-tag"><strong>Speaks:</strong> \${escapeHtml(designer.languages.join(', '))}</div>
                            <div class="stats">
                                <div class="rating">⭐ \${designer.upvotes}</div>
                                <div class="turnaround">⏱ \${designer.turnaroundDays} Days</div>
                            </div>
                            <div class="ai-status \${aiStatus.cls}">\${aiStatus.text}</div>
                        </div>
                    \`;
                }).join('');
            } catch (err) {
                designersGrid.innerHTML = '<div class="empty-state">Error loading data. Please refresh.</div>';
            }
        }

        // Event Listeners for UI
        let searchDebounce;
        searchInput.addEventListener('input', () => { clearTimeout(searchDebounce); searchDebounce = setTimeout(updateURL, 300); });
        aiSlider.addEventListener('input', () => { updateSliderUI(); updateURL(); });
        locationFilter.addEventListener('change', updateURL);
        languageFilter.addEventListener('change', updateURL);
        sortOrder.addEventListener('change', updateURL);
        
        sliderLabels.forEach((lbl, idx) => {
            lbl.addEventListener('click', () => { aiSlider.value = idx; updateSliderUI(); updateURL(); });
        });

        // Modal controls
        function goToStep(step) {
            document.querySelectorAll('.modal-step').forEach(s => s.classList.remove('active'));
            document.getElementById('step-' + step).classList.add('active');
        }
        function resetModal() {
            sessionId = null;
            editingDesignerId = null;
            pendingEditDesignerId = null;
            document.getElementById('profileForm').reset();
            document.getElementById('form-email').value = '';
            document.getElementById('form-code').value = '';
            document.querySelectorAll('.inline-error').forEach(el => { el.style.display = 'none'; el.textContent = ''; });
            document.querySelector('#step-1 h2').textContent = 'Join GDFinder';
            document.getElementById('step1-agreements').style.display = '';
            document.getElementById('submitBtn').textContent = 'Submit profile';
            document.getElementById('hide-listing-btn').style.display = 'none';
            goToStep(1);
        }
        function openModal() {
            resetModal();
            document.getElementById('designerModal').classList.add('active');
        }
        function openModalForEdit(designerId) {
            resetModal();
            pendingEditDesignerId = designerId;
            document.querySelector('#step-1 h2').textContent = 'Edit your listing';
            document.getElementById('step1-agreements').style.display = 'none';
            document.getElementById('designerModal').classList.add('active');
        }
        function closeModal() {
            document.getElementById('designerModal').classList.remove('active');
            resetModal();
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

            const btn = document.querySelector('#step-1 .btn-main');
            btn.disabled = true;
            btn.textContent = 'Sending...';

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
                btn.disabled = false;
                btn.textContent = 'Send verification code';
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
                if (data.designer) populateForm(data.designer);

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
        }

        // Step 3: submit profile (create or update)
        async function submitProfile(event) {
            event.preventDefault();
            const errorEl = document.getElementById('step3-error');
            errorEl.style.display = 'none';

            const categories = document.getElementById('form-cats').value.split(',').map(s => s.trim()).filter(Boolean);
            const languages = document.getElementById('form-langs').value.split(',').map(s => s.trim()).filter(Boolean);
            const aiVal = document.getElementById('form-ai').value;

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
                phoneNumber: document.getElementById('form-phone').value.trim() || null,
                phoneNumberVisible: document.getElementById('form-phone-visible').checked ? 1 : 0,
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
        }
        function cancelHide() {
            document.getElementById('hideConfirmModal').classList.remove('active');
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

        // Boot
        initUIFromURL();
        fetchDesigners();
    </script>
</body>
</html>`;

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
    const from = 'noreply@yourdomain.com'; // Update to your verified sender domain
    const subject = 'Your GDFinder Verification Code';
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
            return new Response(HTML_TEMPLATE, {
                headers: { 'Content-Type': 'text/html; charset=utf-8' }
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
                const ai = Math.min(2, Math.max(0, parseInt(url.searchParams.get('ai') ?? '2', 10)));
                const city = url.searchParams.get('city') || 'All';
                const language = url.searchParams.get('language') || 'All';
                const sort = url.searchParams.get('sort') || 'scoreDesc';

                let sql = "SELECT * FROM designers WHERE status NOT IN ('suspended', 'hidden') AND ai_level <= ?";
                const params = [ai];

                if (city !== 'All') { sql += ' AND city = ?'; params.push(city); }
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

                if (typeof name !== 'string' || name.trim().length < 2) throw new Error('Name is required.');
                if (typeof city !== 'string' || city.trim().length < 1) throw new Error('City is required.');
                if (typeof countryCode !== 'string' || !/^[A-Za-z]{2}$/.test(countryCode)) throw new Error('Country code must be 2 letters.');
                if (!Array.isArray(languages) || languages.length === 0) throw new Error('At least one language is required.');
                if (!Array.isArray(categories) || categories.length === 0) throw new Error('At least one category is required.');
                if (!Number.isInteger(turnaroundDays) || turnaroundDays < 1 || turnaroundDays > 365) throw new Error('Turnaround must be 1-365 days.');
                if (![0, 1, 2].includes(aiLevel)) throw new Error('Invalid AI level.');

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
                        countryCode.toUpperCase().slice(0, 2),
                        email,
                        emailShown ? 1 : 0,
                        phoneNumber ? String(phoneNumber).trim().slice(0, 30) : null,
                        phoneNumberVisible ? 1 : 0,
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

                if (typeof name !== 'string' || name.trim().length < 2) throw new Error('Name is required.');
                if (typeof city !== 'string' || city.trim().length < 1) throw new Error('City is required.');
                if (typeof countryCode !== 'string' || !/^[A-Za-z]{2}$/.test(countryCode)) throw new Error('Country code must be 2 letters.');
                if (!Array.isArray(languages) || languages.length === 0) throw new Error('At least one language is required.');
                if (!Array.isArray(categories) || categories.length === 0) throw new Error('At least one category is required.');
                if (!Number.isInteger(turnaroundDays) || turnaroundDays < 1 || turnaroundDays > 365) throw new Error('Turnaround must be 1-365 days.');
                if (![0, 1, 2].includes(aiLevel)) throw new Error('Invalid AI level.');

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
                    countryCode.toUpperCase().slice(0, 2),
                    emailShown ? 1 : 0,
                    phoneNumber ? String(phoneNumber).trim().slice(0, 30) : null,
                    phoneNumberVisible ? 1 : 0,
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
