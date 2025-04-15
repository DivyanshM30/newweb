// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    const certificateCards = document.querySelectorAll('.certificate-card');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        certificateCards.forEach(card => {
            const courseName = card.querySelector('h3').textContent.toLowerCase();
            const issuedDate = card.querySelectorAll('p')[0].textContent.toLowerCase();
            const certificateID = card.querySelectorAll('p')[1].textContent.toLowerCase();
            
            // Check if any of the card content matches the search term
            if (courseName.includes(searchTerm) || issuedDate.includes(searchTerm) || certificateID.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
    
    // Notification bell functionality
    const notificationBell = document.querySelector('.notifications');
    notificationBell.addEventListener('click', function() {
        alert('You have no new notifications.');
    });
    
    // Certificate card interaction
    certificateCards.forEach(card => {
        // Hover effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
        });
        
        // Download button functionality
        const downloadBtn = card.querySelector('.btn-primary');
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const certificateName = card.querySelector('h3').textContent;
            const certificateID = card.querySelectorAll('p')[1].textContent.split(': ')[1];
            
            downloadCertificate(certificateName, certificateID);
        });
    });
    
    // Add "Share Certificate" buttons
    certificateCards.forEach(card => {
        const shareBtn = document.createElement('button');
        shareBtn.textContent = 'Share Certificate';
        shareBtn.classList.add('btn-secondary');
        shareBtn.style.marginLeft = '10px';
        shareBtn.style.backgroundColor = '#7f8c8d';
        shareBtn.style.color = 'white';
        shareBtn.style.border = 'none';
        shareBtn.style.borderRadius = '3px';
        shareBtn.style.padding = '8px 12px';
        shareBtn.style.cursor = 'pointer';
        
        shareBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const certificateName = card.querySelector('h3').textContent;
            const certificateID = card.querySelectorAll('p')[1].textContent.split(': ')[1];
            
            shareCertificate(certificateName, certificateID);
        });
        
        const downloadBtn = card.querySelector('.btn-primary');
        downloadBtn.parentNode.insertBefore(shareBtn, downloadBtn.nextSibling);
    });
    
    // Create and append sorting control
    const sortingControl = document.createElement('div');
    sortingControl.className = 'sorting-control';
    sortingControl.style.marginBottom = '20px';
    sortingControl.innerHTML = `
        <label for="sort-certificates">Sort by: </label>
        <select id="sort-certificates">
            <option value="name">Certificate Name</option>
            <option value="date-newest">Issue Date (Newest First)</option>
            <option value="date-oldest">Issue Date (Oldest First)</option>
            <option value="id">Certificate ID</option>
        </select>
    `;
    
    document.querySelector('h2').insertAdjacentElement('afterend', sortingControl);
    
    // Add sorting functionality
    document.getElementById('sort-certificates').addEventListener('change', function() {
        const certificateList = document.querySelector('.certificate-list');
        const cardsArray = Array.from(certificateCards);
        
        cardsArray.sort((a, b) => {
            const nameA = a.querySelector('h3').textContent;
            const nameB = b.querySelector('h3').textContent;
            const dateA = new Date(a.querySelectorAll('p')[0].textContent.replace('Issued on: ', ''));
            const dateB = new Date(b.querySelectorAll('p')[0].textContent.replace('Issued on: ', ''));
            const idA = a.querySelectorAll('p')[1].textContent.split(': ')[1];
            const idB = b.querySelectorAll('p')[1].textContent.split(': ')[1];
            
            switch(this.value) {
                case 'name':
                    return nameA.localeCompare(nameB);
                case 'date-newest':
                    return dateB - dateA;
                case 'date-oldest':
                    return dateA - dateB;
                case 'id':
                    return idA.localeCompare(idB);
                default:
                    return 0;
            }
        });
        
        // Remove all cards
        certificateCards.forEach(card => card.remove());
        
        // Append sorted cards
        cardsArray.forEach(card => certificateList.appendChild(card));
    });
    
    // Create a filter for certificate date range
    const filterControl = document.createElement('div');
    filterControl.className = 'filter-control';
    filterControl.style.marginBottom = '20px';
    filterControl.style.marginLeft = '20px';
    filterControl.style.display = 'inline-block';
    filterControl.innerHTML = `
        <label for="filter-date-range">Filter by date: </label>
        <select id="filter-date-range">
            <option value="all">All Time</option>
            <option value="month-1">Last Month</option>
            <option value="month-3">Last 3 Months</option>
            <option value="month-6">Last 6 Months</option>
            <option value="year-1">Last Year</option>
        </select>
    `;
    
    document.querySelector('.sorting-control').insertAdjacentElement('afterend', filterControl);
    
    // Add date range filtering functionality
    document.getElementById('filter-date-range').addEventListener('change', function() {
        const range = this.value;
        const now = new Date();
        
        certificateCards.forEach(card => {
            const issueDateText = card.querySelectorAll('p')[0].textContent.replace('Issued on: ', '');
            const issueDate = new Date(issueDateText);
            
            // Calculate the difference in months
            let diff = (now.getFullYear() - issueDate.getFullYear()) * 12;
            diff += now.getMonth() - issueDate.getMonth();
            
            switch(range) {
                case 'all':
                    card.style.display = 'block';
                    break;
                case 'month-1':
                    card.style.display = diff <= 1 ? 'block' : 'none';
                    break;
                case 'month-3':
                    card.style.display = diff <= 3 ? 'block' : 'none';
                    break;
                case 'month-6':
                    card.style.display = diff <= 6 ? 'block' : 'none';
                    break;
                case 'year-1':
                    card.style.display = diff <= 12 ? 'block' : 'none';
                    break;
                default:
                    card.style.display = 'block';
            }
        });
    });
    
    // Add "Preview Certificate" feature
    certificateCards.forEach(card => {
        // Add a preview button
        const previewBtn = document.createElement('button');
        previewBtn.innerHTML = '👁️ Preview';
        previewBtn.classList.add('preview-btn');
        previewBtn.style.backgroundColor = 'transparent';
        previewBtn.style.border = 'none';
        previewBtn.style.color = '#3498db';
        previewBtn.style.cursor = 'pointer';
        previewBtn.style.marginTop = '10px';
        previewBtn.style.display = 'block';
        
        previewBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const certificateName = card.querySelector('h3').textContent;
            const issueDate = card.querySelectorAll('p')[0].textContent.split(': ')[1];
            const certificateID = card.querySelectorAll('p')[1].textContent.split(': ')[1];
            
            previewCertificate(certificateName, issueDate, certificateID);
        });
        
        card.appendChild(previewBtn);
    });
    
    // Add certificate statistics
    createCertificateStats();
    
    // Function to simulate certificate download
    function downloadCertificate(name, id) {
        // Show loading indicator
        const loadingOverlay = document.createElement('div');
        loadingOverlay.style.position = 'fixed';
        loadingOverlay.style.top = '0';
        loadingOverlay.style.left = '0';
        loadingOverlay.style.width = '100%';
        loadingOverlay.style.height = '100%';
        loadingOverlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
        loadingOverlay.style.display = 'flex';
        loadingOverlay.style.justifyContent = 'center';
        loadingOverlay.style.alignItems = 'center';
        loadingOverlay.style.zIndex = '1000';
        
        const loadingText = document.createElement('div');
        loadingText.textContent = 'Preparing certificate for download...';
        loadingText.style.color = 'white';
        loadingText.style.backgroundColor = '#333';
        loadingText.style.padding = '20px';
        loadingText.style.borderRadius = '5px';
        
        loadingOverlay.appendChild(loadingText);
        document.body.appendChild(loadingOverlay);
        
        // Simulate download process
        setTimeout(() => {
            document.body.removeChild(loadingOverlay);
            alert(`Certificate for "${name}" (ID: ${id}) has been downloaded.`);
        }, 1500);
    }
    
    // Function to share certificate
    function shareCertificate(name, id) {
        // Create share modal
        const modal = document.createElement('div');
        modal.className = 'share-modal';
        modal.style.position = 'fixed';
        modal.style.top = '50%';
        modal.style.left = '50%';
        modal.style.transform = 'translate(-50%, -50%)';
        modal.style.backgroundColor = 'white';
        modal.style.padding = '20px';
        modal.style.borderRadius = '5px';
        modal.style.boxShadow = '0 0 20px rgba(0,0,0,0.2)';
        modal.style.zIndex = '100';
        modal.style.width = '400px';
        
        modal.innerHTML = `
            <h3>Share Certificate</h3>
            <p>Share your certificate for "${name}" (ID: ${id})</p>
            <div class="share-options" style="display: flex; justify-content: space-between; margin: 20px 0;">
                <button class="share-btn" data-platform="email" style="padding: 10px; background-color: #3498db; color: white; border: none; border-radius: 3px; cursor: pointer;">📧 Email</button>
                <button class="share-btn" data-platform="linkedin" style="padding: 10px; background-color: #0077b5; color: white; border: none; border-radius: 3px; cursor: pointer;">LinkedIn</button>
                <button class="share-btn" data-platform="twitter" style="padding: 10px; background-color: #1da1f2; color: white; border: none; border-radius: 3px; cursor: pointer;">Twitter</button>
                <button class="share-btn" data-platform="facebook" style="padding: 10px; background-color: #3b5998; color: white; border: none; border-radius: 3px; cursor: pointer;">Facebook</button>
            </div>
            <div class="certificate-link">
                <p>Or copy this link:</p>
                <input type="text" value="https://learning-platform.com/cert/${id}" style="width: 100%; padding: 8px; margin-top: 5px; border: 1px solid #ddd; border-radius: 3px;" readonly>
            </div>
            <button class="close-modal" style="margin-top: 15px; padding: 8px 12px; background-color: #e74c3c; color: white; border: none; border-radius: 3px; cursor: pointer; float: right;">Close</button>
        `;
        
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
        overlay.style.zIndex = '99';
        
        document.body.appendChild(overlay);
        document.body.appendChild(modal);
        
        // Handle share button clicks
        const shareButtons = modal.querySelectorAll('.share-btn');
        shareButtons.forEach(button => {
            button.addEventListener('click', function() {
                const platform = this.getAttribute('data-platform');
                alert(`Sharing certificate on ${platform}...`);
                modal.remove();
                overlay.remove();
            });
        });
        
        // Handle input field click (select all text)
        const linkInput = modal.querySelector('input');
        linkInput.addEventListener('click', function() {
            this.select();
            document.execCommand('copy');
            alert('Link copied to clipboard!');
        });
        
        // Handle close button and overlay click
        modal.querySelector('.close-modal').addEventListener('click', function() {
            modal.remove();
            overlay.remove();
        });
        
        overlay.addEventListener('click', function() {
            modal.remove();
            overlay.remove();
        });
    }
    
    // Function to preview certificate
    function previewCertificate(name, issueDate, id) {
        // Create certificate preview modal
        const modal = document.createElement('div');
        modal.className = 'certificate-preview';
        modal.style.position = 'fixed';
        modal.style.top = '50%';
        modal.style.left = '50%';
        modal.style.transform = 'translate(-50%, -50%)';
        modal.style.backgroundColor = 'white';
        modal.style.padding = '20px';
        modal.style.borderRadius = '5px';
        modal.style.boxShadow = '0 0 20px rgba(0,0,0,0.2)';
        modal.style.zIndex = '100';
        modal.style.width = '80%';
        modal.style.maxWidth = '800px';
        modal.style.height = '500px';
        modal.style.maxHeight = '90vh';
        modal.style.overflow = 'auto';
        
        // Create certificate template
        modal.innerHTML = `
            <div class="certificate-template" style="border: 15px solid #3498db; padding: 30px; text-align: center; position: relative; height: 100%; background-color: #f9f9f9;">
                <div class="certificate-header" style="margin-bottom: 20px;">
                    <h2 style="font-size: 24px; color: #2c3e50;">Learning Platform</h2>
                    <h1 style="font-size: 36px; color: #2c3e50; margin-top: 10px;">Certificate of Completion</h1>
                </div>
                <div class="certificate-body" style="margin: 40px 0;">
                    <p style="font-size: 18px; margin-bottom: 30px;">This is to certify that</p>
                    <h3 style="font-size: 28px; color: #3498db; margin-bottom: 30px;">Divyansh Mishra</h3>
                    <p style="font-size: 18px; margin-bottom: 30px;">has successfully completed the course</p>
                    <h3 style="font-size: 24px; color: #2c3e50; margin-bottom: 30px;">${name}</h3>
                    <p style="font-size: 18px;">Issued on: ${issueDate}</p>
                    <p style="font-size: 14px; margin-top: 10px;">Certificate ID: ${id}</p>
                </div>
                <div class="certificate-footer" style="position: absolute; bottom: 30px; width: calc(100% - 60px); display: flex; justify-content: space-between;">
                    <div class="signature" style="border-top: 1px solid #2c3e50; padding-top: 5px; width: 200px;">
                        <p>Course Instructor</p>
                    </div>
                    <div class="signature" style="border-top: 1px solid #2c3e50; padding-top: 5px; width: 200px;">
                        <p>Program Director</p>
                    </div>
                </div>
                <div class="certificate-seal" style="position: absolute; bottom: 100px; right: 50px; width: 100px; height: 100px; border: 2px solid #3498db; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-size: 14px; color: #3498db; transform: rotate(-15deg);">
                    CERTIFIED
                </div>
                <button class="close-modal" style="position: absolute; top: 10px; right: 10px; background-color: #e74c3c; color: white; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; font-size: 16px;">✕</button>
            </div>
        `;
        
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.7)';
        overlay.style.zIndex = '99';
        
        document.body.appendChild(overlay);
        document.body.appendChild(modal);
        
        // Handle close button and overlay click
        modal.querySelector('.close-modal').addEventListener('click', function() {
            modal.remove();
            overlay.remove();
        });
        
        overlay.addEventListener('click', function() {
            modal.remove();
            overlay.remove();
        });
    }
    
    // Function to create certificate statistics section
    function createCertificateStats() {
        const statsSection = document.createElement('div');
        statsSection.className = 'certificate-stats';
        statsSection.style.marginTop = '30px';
        statsSection.style.padding = '20px';
        statsSection.style.backgroundColor = '#f8f9fa';
        statsSection.style.borderRadius = '5px';
        statsSection.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        
        // Calculate statistics
        const totalCertificates = certificateCards.length;
        const latestCertDate = certificateCards.length > 0 ? 
            certificateCards[0].querySelectorAll('p')[0].textContent.split(': ')[1] : 'None';
        
        // Create chart data
        const courseCategoryCounts = {
            'Web Development': 2,
            'Programming': 1,
            'Data Science': 1,
            'Design': 0,
            'Business': 0
        };
        
        statsSection.innerHTML = `
            <h3>Certificate Statistics</h3>
            <div class="stats-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-top: 15px;">
                <div class="stat-card" style="background-color: white; padding: 15px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                    <h4>Total Certificates</h4>
                    <p style="font-size: 24px; font-weight: bold; color: #3498db;">${totalCertificates}</p>
                </div>
                <div class="stat-card" style="background-color: white; padding: 15px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                    <h4>Latest Certificate</h4>
                    <p style="font-size: 16px; color: #2c3e50;">${latestCertDate}</p>
                </div>
                <div class="stat-card" style="background-color: white; padding: 15px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                    <h4>Certificate Categories</h4>
                    <div class="category-bars" style="margin-top: 10px;">
                        ${Object.entries(courseCategoryCounts).map(([category, count]) => `
                            <div style="display: flex; align-items: center; margin-bottom: 5px;">
                                <div style="width: 120px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${category}</div>
                                <div style="flex-grow: 1; background-color: #eee; height: 10px; border-radius: 5px; margin: 0 10px;">
                                    <div style="width: ${count/2*100}%; background-color: #3498db; height: 10px; border-radius: 5px;"></div>
                                </div>
                                <div>${count}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            <div class="stats-footer" style="margin-top: 15px; text-align: right;">
                <button id="export-certificates" style="padding: 8px 12px; background-color: #2ecc71; color: white; border: none; border-radius: 3px; cursor: pointer;">
                    Export Certificate List
                </button>
            </div>
        `;
        
        document.querySelector('.main-content').appendChild(statsSection);
        
        // Add export functionality
        document.getElementById('export-certificates').addEventListener('click', function() {
            alert('Certificate list exported as CSV file.');
        });
    }
});