document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", function () {
      mobileMenu.classList.toggle("active");

      // Toggle hamburger animation
      const spans = this.querySelectorAll("span");
      if (mobileMenu.classList.contains("active")) {
        spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
        spans[1].style.opacity = "0";
        spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
      } else {
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
      }
    });
  }

  // View Toggle (Grid/List)
  const viewBtns = document.querySelectorAll(".view-btn");
  const papersContainer = document.getElementById("papers-container");

  if (viewBtns.length && papersContainer) {
    // Set initial view based on the active button (or default to grid)
    const initialActiveBtn = document.querySelector(".view-btn.active");
    const initialView = initialActiveBtn ? initialActiveBtn.getAttribute("data-view") : "grid";
    if (initialView === "grid") {
      papersContainer.classList.remove("list-view");
      papersContainer.classList.add("grid-view");
    } else {
      papersContainer.classList.remove("grid-view");
      papersContainer.classList.add("list-view");
    }

    viewBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Remove active class from all buttons
        viewBtns.forEach((b) => b.classList.remove("active"));

        // Add active class to clicked button
        this.classList.add("active");

        // Update view
        const viewType = this.getAttribute("data-view");
        if (viewType === "grid") {
          papersContainer.classList.remove("list-view");
          papersContainer.classList.add("grid-view");
        } else {
          papersContainer.classList.remove("grid-view");
          papersContainer.classList.add("list-view");
        }
      });
    });
  }

  // Sort Options
  const sortOptions = document.getElementById("sort-options");
  if (sortOptions) {
    sortOptions.addEventListener("change", function () {
      // This would typically trigger a re-fetch or re-sort of papers
      // For demo purposes, we'll just log the selected option
      console.log("Sort by:", this.value);

      // In a real application, you would call a function to sort the papers
      // sortPapers(this.value);
      // Example: If using the demo setup, re-render with sorted papers
      if (window.getAllPapers && window.renderPapers) {
        const allPapers = window.getAllPapers();
        // Add sorting logic here based on this.value
        // window.renderPapers(sortedPapers);
      }
    });
  }

  // Filter Buttons
  const filterBtns = document.querySelectorAll(".filter-btn");
  if (filterBtns.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Basic active state management for filter buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filter = this.getAttribute("data-filter");
        console.log("Filter by:", filter);

        // In a real application, you would apply the filter
        // applyFilter(filter);
         // Example: If using the demo setup, filter and re-render
        if (window.getAllPapers && window.renderPapers && window.renderAllPapers) {
            if (filter === 'all') {
                window.renderAllPapers();
                 // Update header if needed
                const sectionHeader = document.querySelector(".section-header h2");
                if (sectionHeader) {
                    sectionHeader.textContent = "Latest Research Papers";
                }
            } else {
                const allPapers = window.getAllPapers();
                const filteredPapers = allPapers.filter(p => p.category.toLowerCase() === filter.toLowerCase());
                window.renderPapers(filteredPapers);
                 // Update header if needed
                const sectionHeader = document.querySelector(".section-header h2");
                if (sectionHeader) {
                    sectionHeader.textContent = `${filter} Papers (${filteredPapers.length})`;
                }
            }
        }
      });
    });
  }

  // Search Functionality
  const searchForm = document.querySelector(".search-container");
  const searchInput = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-btn");

  if (searchForm && searchInput) {
    // Handle form submission
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      performSearch(searchInput.value.trim());
    });

    // Also handle button click separately
    if (searchBtn) {
      searchBtn.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent potential form submission if it's inside the form
        performSearch(searchInput.value.trim());
      });
    }

    // Handle real-time search as user types (with debounce)
    let debounceTimer;
    searchInput.addEventListener("input", () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm.length >= 3) {
          // Only search if at least 3 characters
          performSearch(searchTerm);
        } else if (searchTerm.length === 0) {
          // If search is cleared, show all papers (or the current filter)
          // Check if a filter is active
          const activeFilterBtn = document.querySelector(".filter-btn.active");
          const currentFilter = activeFilterBtn ? activeFilterBtn.getAttribute('data-filter') : 'all';
          if (currentFilter === 'all' && window.renderAllPapers) {
             window.renderAllPapers();
             const sectionHeader = document.querySelector(".section-header h2");
             if (sectionHeader) sectionHeader.textContent = "Latest Research Papers";
          } else if (window.getAllPapers && window.renderPapers) {
             const allPapers = window.getAllPapers();
             const filteredPapers = allPapers.filter(p => p.category.toLowerCase() === currentFilter.toLowerCase());
             window.renderPapers(filteredPapers);
             const sectionHeader = document.querySelector(".section-header h2");
             if (sectionHeader) sectionHeader.textContent = `${currentFilter} Papers (${filteredPapers.length})`;
          }
        }
      }, 500); // 500ms debounce
    });
  }

  // Function to perform search
  function performSearch(searchTerm) {
    // Removed check !searchTerm because we might want to clear search
     if (!searchTerm && searchTerm !== "") return; // Allow empty string to clear search


    console.log("Searching for:", searchTerm);

    // Ensure necessary functions/data are available
    if (!window.getAllPapers || !window.renderPapers) {
        console.error("Paper data functions (getAllPapers, renderPapers) not available.");
        return;
    }

    const allPapers = window.getAllPapers();

    // If search term is empty, revert to showing all (respecting filters maybe?)
    if (searchTerm === "") {
        // Revert based on active filter
         const activeFilterBtn = document.querySelector(".filter-btn.active");
         const currentFilter = activeFilterBtn ? activeFilterBtn.getAttribute('data-filter') : 'all';
         if (currentFilter === 'all') {
             window.renderAllPapers ? window.renderAllPapers() : window.renderPapers(allPapers);
             const sectionHeader = document.querySelector(".section-header h2");
             if (sectionHeader) sectionHeader.textContent = "Latest Research Papers";
         } else {
             const filteredPapers = allPapers.filter(p => p.category.toLowerCase() === currentFilter.toLowerCase());
             window.renderPapers(filteredPapers);
             const sectionHeader = document.querySelector(".section-header h2");
             if (sectionHeader) sectionHeader.textContent = `${currentFilter} Papers (${filteredPapers.length})`;
         }
        // Clear active filter if search was main action? Depends on UX goal.
        // filterBtns.forEach(b => b.classList.remove('active'));
        // const allFilterBtn = document.querySelector('.filter-btn[data-filter="all"]');
        // if (allFilterBtn) allFilterBtn.classList.add('active');
        return; // Exit after clearing/reverting
    }


    // Convert search term to lowercase for case-insensitive search
    const term = searchTerm.toLowerCase();

    // Filter papers based on search term
    const filteredPapers = allPapers.filter((paper) => {
      return (
        paper.title.toLowerCase().includes(term) ||
        paper.authors.toLowerCase().includes(term) ||
        (paper.abstract && paper.abstract.toLowerCase().includes(term)) || // check if abstract exists
        paper.category.toLowerCase().includes(term) ||
        (paper.keywords && paper.keywords.some(kw => kw.toLowerCase().includes(term))) // Example: Search keywords if they exist
      );
    });

    // Render the filtered papers
    window.renderPapers(filteredPapers);

    // Update UI to show search results
    const sectionHeader = document.querySelector(".section-header h2");
    if (sectionHeader) {
      if (filteredPapers.length > 0) {
        sectionHeader.textContent = `Search Results for "${searchTerm}" (${filteredPapers.length})`;
      } else {
        sectionHeader.textContent = `No Results Found for "${searchTerm}"`;
      }
       // Optionally deactivate filter buttons when search is active
       filterBtns.forEach(b => b.classList.remove('active'));
    }

    // Scroll to papers section if results are found
    if (filteredPapers.length > 0) {
       const papersSection = document.getElementById("papers");
       if (papersSection) {
            papersSection.scrollIntoView({ behavior: "smooth" });
       }
    }
  }

  // Make the search function globally available if needed elsewhere
  // window.performSearch = performSearch; // No longer seems necessary based on usage

  // Pagination (Assuming static total pages for now)
  const prevPageBtn = document.getElementById("prev-page");
  const nextPageBtn = document.getElementById("next-page");
  const currentPageSpan = document.querySelector(".current-page");
  const totalPagesSpan = document.querySelector(".total-pages");

  if (prevPageBtn && nextPageBtn && currentPageSpan && totalPagesSpan) {
    let currentPage = 1;
    // This should be dynamically set based on total papers and items per page
    let totalPages = 1; // Default or calculate based on initial load

    // Function to update total pages (call this when papers are rendered/filtered)
    window.updateTotalPages = (totalItems, itemsPerPage) => {
        totalPages = Math.ceil(totalItems / itemsPerPage);
        totalPages = Math.max(1, totalPages); // Ensure at least 1 page
        totalPagesSpan.textContent = totalPages;
        // Reset to page 1 if current page becomes invalid (optional)
        if (currentPage > totalPages) {
            currentPage = 1;
        }
        updatePaginationState();
    };

    // Call initially if possible (e.g., after initial render in papers.js)
    // Example: Assume 9 items per page from your render logic
    // if (window.getAllPapers) {
    //    window.updateTotalPages(window.getAllPapers().length, 9);
    // }

    updatePaginationState();

    prevPageBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        updatePaginationState();
        // In a real application, you would load the previous page data
        console.log("Load page:", currentPage);
        // loadPage(currentPage);
        // Example: If using the demo setup, re-render with pagination
        // if (window.renderAllPapers) window.renderAllPapers(currentPage);
      }
    });

    nextPageBtn.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        updatePaginationState();
        // In a real application, you would load the next page data
        console.log("Load page:", currentPage);
        // loadPage(currentPage);
         // Example: If using the demo setup, re-render with pagination
        // if (window.renderAllPapers) window.renderAllPapers(currentPage);
      }
    });

    function updatePaginationState() {
      currentPageSpan.textContent = currentPage;
      prevPageBtn.disabled = currentPage === 1;
      nextPageBtn.disabled = currentPage >= totalPages; // Use >= to handle 1-page case correctly
       // Add/remove classes for styling disabled state if needed
       prevPageBtn.classList.toggle('disabled', currentPage === 1);
       nextPageBtn.classList.toggle('disabled', currentPage >= totalPages);
    }

     // Make updatePaginationState globally accessible if needed
     window.updatePaginationUI = updatePaginationState;
     window.getCurrentPage = () => currentPage;
     window.setCurrentPage = (page) => { currentPage = page; updatePaginationState(); };
  }

  // Newsletter Form
  const newsletterForm = document.getElementById("newsletter-form");
  const newsletterMessage = document.getElementById("newsletter-message");

  if (newsletterForm && newsletterMessage) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value.trim();

      if (email && emailInput.checkValidity()) { // Basic HTML5 validation
        newsletterMessage.textContent = "Subscribing...";
        newsletterMessage.className = 'newsletter-message info'; // Use classes for styling
        newsletterMessage.style.display = 'block'; // Make sure it's visible

        // Simulate API call
        setTimeout(() => {
          newsletterMessage.textContent = "Thank you for subscribing!";
          newsletterMessage.className = 'newsletter-message success'; // Success class
          this.reset(); // Clear the form
           // Hide message after a few seconds
           setTimeout(() => {
                newsletterMessage.style.display = 'none';
           }, 3000);
        }, 1500);
      } else {
          newsletterMessage.textContent = "Please enter a valid email address.";
          newsletterMessage.className = 'newsletter-message error'; // Error class
          newsletterMessage.style.display = 'block';
      }
    });
  }

  // Paper Modal
  const paperModal = document.getElementById("paper-modal");
  const paperDetails = document.getElementById("paper-details");
  const closeModalBtns = document.querySelectorAll(".close-modal");

  // Close modal when clicking the close button (X)
  if (closeModalBtns.length) {
    closeModalBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const modal = this.closest(".modal"); // Find the closest parent modal
        if (modal) {
          modal.style.display = "none";
          document.body.classList.remove('modal-open'); // Remove class from body
        }
      });
    });
  }

  // Close modal when clicking outside the modal content (on the overlay)
  if (paperModal) {
      paperModal.addEventListener("click", (e) => {
        // Check if the click is directly on the modal overlay itself
        if (e.target === paperModal) {
          paperModal.style.display = "none";
          document.body.classList.remove('modal-open'); // Remove class from body
        }
      });
  }

  // Close modal with the Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && paperModal && paperModal.style.display === 'flex') {
        paperModal.style.display = 'none';
        document.body.classList.remove('modal-open'); // Remove class from body
    }
  });


  // Function to open paper details modal
  window.openPaperDetails = (paperId) => {
    // Ensure necessary functions/data are available
    if (!window.getPaperById) {
        console.error("getPaperById function not available.");
        return;
    }

    if (paperModal && paperDetails) {
      // Get the paper details
      const paper = window.getPaperById(paperId);

      if (!paper) {
          console.error(`Paper with ID ${paperId} not found.`);
          return;
      }

      // Generate a shareable URL for this paper
      const shareUrl = generateShareableUrl(paper.id);

      // Simplified citation generation (adjust as needed)
      const year = paper.date ? new Date(paper.date).getFullYear() : 'n.d.';
      const authorsList = paper.authors ? paper.authors.split(',').map(a => a.trim()) : ['N/A'];
      const firstAuthorLastName = authorsList[0].split(' ').pop();
      const apaAuthors = authorsList.length > 1 ? `${firstAuthorLastName}, ${authorsList[0].split(' ')[0].charAt(0)}. et al.` : `${firstAuthorLastName}, ${authorsList[0].split(' ')[0].charAt(0)}.`;
      const mlaAuthors = authorsList.length > 1 ? `${authorsList[0]} et al.` : authorsList[0];
      const chicagoAuthors = paper.authors || 'N/A';

      const citationAPA = `${apaAuthors} (${year}). ${paper.title}. *Journal Name or Source*. DOI or URL`; // Placeholder
      const citationMLA = `${mlaAuthors}. "${paper.title}." *Journal Name or Source*, ${year}. DOI or URL.`; // Placeholder
      const citationChicago = `${chicagoAuthors}. "${paper.title}." *Journal Name or Source* (${year}). DOI or URL.`; // Placeholder


      // Populate the modal with paper details
      // Using textContent for safety where possible, innerHTML for structure
      paperDetails.innerHTML = `
        <div class="paper-details-content">
            <button class="close-modal top-right"><i class="fas fa-times"></i></button> <!-- Added close button inside content too -->
            <div class="paper-details-header">
                <h2 class="paper-details-title">${paper.title}</h2>
                <div class="paper-details-meta">
                <div><i class="fas fa-users"></i> ${paper.authors || 'N/A'}</div>
                <div><i class="fas fa-calendar"></i> ${paper.date ? new Date(paper.date).toLocaleDateString() : 'N/A'}</div>
                <div><i class="fas fa-book"></i> ${paper.source || 'Independent Researcher'}</div> <!-- Example: Add source if available -->
                <div><i class="fas fa-quote-right"></i> ${paper.citations != null ? paper.citations : 'N/A'} citations</div>
                </div>
                <div class="paper-category">${paper.category}</div>
            </div>

            <div class="paper-details-abstract">
                <h3>Abstract</h3>
                <p>${paper.abstract || 'No abstract available.'}</p>
            </div>

            <div class="paper-details-actions">
                <button class="btn btn-primary" onclick="downloadPaper(${paper.id})">
                <i class="fas fa-download"></i> Download PDF
                </button>
                <button class="btn btn-outline" onclick="toggleCitation(${paper.id})">
                <i class="fas fa-quote-right"></i> Cite
                </button>
                <button class="btn btn-outline" onclick="sharePaper(${paper.id})">
                <i class="fas fa-share-alt"></i> Share
                </button>
            </div>

            <div class="paper-details-collapsible" id="citation-${paper.id}" style="display: none;">
                <h3>Citation</h3>
                <div class="citation-formats">
                    <p><strong>APA:</strong><br>${citationAPA}</p>
                    <p><strong>MLA:</strong><br>${citationMLA}</p>
                    <p><strong>Chicago:</strong><br>${citationChicago}</p>
                    <button class="btn btn-sm btn-outline copy-citation" data-format="apa" data-paper-id="${paper.id}">Copy APA</button>
                    <button class="btn btn-sm btn-outline copy-citation" data-format="mla" data-paper-id="${paper.id}">Copy MLA</button>
                    <button class="btn btn-sm btn-outline copy-citation" data-format="chicago" data-paper-id="${paper.id}">Copy Chicago</button>
                    <span class="copy-feedback" id="copy-feedback-citation-${paper.id}"></span>
                </div>
            </div>

            <div class="paper-details-collapsible" id="share-${paper.id}" style="display: none;">
                <h3>Share this Paper</h3>
                <div class="share-options">
                    <div class="share-link-container">
                        <input type="text" id="share-link-${paper.id}" value="${shareUrl}" readonly>
                        <button class="btn btn-sm btn-outline" onclick="copyShareLink(${paper.id})">
                        <i class="fas fa-copy"></i> Copy Link
                        </button>
                        <span class="copy-feedback" id="copy-feedback-link-${paper.id}"></span>
                    </div>
                    <div class="social-share">
                        <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent('Check out this research paper: ' + paper.title)}" target="_blank" rel="noopener noreferrer" class="social-share-btn twitter">
                        <i class="fab fa-twitter"></i> Twitter
                        </a>
                        <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}" target="_blank" rel="noopener noreferrer" class="social-share-btn facebook">
                        <i class="fab fa-facebook-f"></i> Facebook
                        </a>
                        <a href="https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(paper.title)}" target="_blank" rel="noopener noreferrer" class="social-share-btn linkedin">
                        <i class="fab fa-linkedin-in"></i> LinkedIn
                        </a>
                    </div>
                </div>
            </div>
        </div>
      `;

      // Re-attach listener for the *new* close button inside the content
       const newCloseBtn = paperDetails.querySelector('.close-modal.top-right');
       if (newCloseBtn) {
           newCloseBtn.addEventListener('click', () => {
               paperModal.style.display = 'none';
               document.body.classList.remove('modal-open');
           });
       }

        // Add listeners for the new copy citation buttons
        attachCopyCitationListeners(paper.id, { apa: citationAPA, mla: citationMLA, chicago: citationChicago });


      // Show the modal
      paperModal.style.display = "flex";
      document.body.classList.add('modal-open'); // Optional: Prevent body scrolling
    }
  };

  // Function to generate a shareable URL for a paper
  function generateShareableUrl(paperId) {
    const url = new URL(window.location.origin + window.location.pathname); // Base URL without existing params
    url.searchParams.set("paper", paperId);
    return url.toString();
  }

  // *** NEW FUNCTION TO HANDLE CITATION TOGGLE ***
  window.toggleCitation = (paperId) => {
    const citationDiv = document.getElementById(`citation-${paperId}`);
    const shareDiv = document.getElementById(`share-${paperId}`);

    if (!citationDiv) {
        console.error(`Citation div not found for paper ${paperId}`);
        return;
    }

    // Hide share div if it exists and is open
    if (shareDiv && shareDiv.style.display !== 'none') {
        shareDiv.style.display = 'none';
    }

    // Toggle citation div
    citationDiv.style.display = citationDiv.style.display === 'none' ? 'block' : 'none';
  };

  // Function to toggle share section
  window.sharePaper = (paperId) => {
    const shareDiv = document.getElementById(`share-${paperId}`);
    const citationDiv = document.getElementById(`citation-${paperId}`);

    if (!shareDiv) {
        console.error(`Share div not found for paper ${paperId}`);
        return;
    }

    // Hide citation div if it exists and is open
    if (citationDiv && citationDiv.style.display !== 'none') {
        citationDiv.style.display = 'none';
    }

    // Toggle share div
    shareDiv.style.display = shareDiv.style.display === 'none' ? 'block' : 'none';
  };

  // Function to copy share link to clipboard
  window.copyShareLink = (paperId) => {
    const linkInput = document.getElementById(`share-link-${paperId}`);
    const feedbackSpan = document.getElementById(`copy-feedback-link-${paperId}`);
    const button = linkInput ? linkInput.nextElementSibling : null; // Assumes button is next sibling

    if (linkInput && navigator.clipboard) { // Use modern clipboard API
         navigator.clipboard.writeText(linkInput.value).then(() => {
             // Show feedback
             if (feedbackSpan) feedbackSpan.textContent = 'Copied!';
             if (button) {
                 const originalIcon = button.innerHTML;
                 button.innerHTML = '<i class="fas fa-check"></i> Copied!';
                 button.disabled = true;

                 // Reset button text after 2 seconds
                 setTimeout(() => {
                     button.innerHTML = originalIcon;
                     button.disabled = false;
                     if (feedbackSpan) feedbackSpan.textContent = '';
                 }, 2000);
             }
         }).catch(err => {
             console.error('Failed to copy link: ', err);
             if (feedbackSpan) feedbackSpan.textContent = 'Copy failed';
             setTimeout(() => { if (feedbackSpan) feedbackSpan.textContent = ''; }, 2000);
         });
    } else if (linkInput) { // Fallback for older browsers
        try {
            linkInput.select();
            document.execCommand("copy");
             // Show feedback
             if (feedbackSpan) feedbackSpan.textContent = 'Copied!';
             if (button) {
                 const originalIcon = button.innerHTML;
                 button.innerHTML = '<i class="fas fa-check"></i> Copied!';
                 button.disabled = true;

                 // Reset button text after 2 seconds
                 setTimeout(() => {
                     button.innerHTML = originalIcon;
                     button.disabled = false;
                      if (feedbackSpan) feedbackSpan.textContent = '';
                 }, 2000);
             }
        } catch (err) {
            console.error('Fallback copy failed: ', err);
             if (feedbackSpan) feedbackSpan.textContent = 'Copy failed';
             setTimeout(() => { if (feedbackSpan) feedbackSpan.textContent = ''; }, 2000);
        }
    }
  };

  // Function to handle copying citations
  function copyCitationText(textToCopy, feedbackElement, buttonElement) {
      if (navigator.clipboard) {
          navigator.clipboard.writeText(textToCopy).then(() => {
              if (feedbackElement) feedbackElement.textContent = 'Copied!';
              if (buttonElement) buttonElement.disabled = true; // Briefly disable button
              setTimeout(() => {
                  if (feedbackElement) feedbackElement.textContent = '';
                  if (buttonElement) buttonElement.disabled = false;
              }, 2000);
          }).catch(err => {
              console.error('Failed to copy citation: ', err);
              if (feedbackElement) feedbackElement.textContent = 'Copy failed';
               setTimeout(() => { if (feedbackElement) feedbackElement.textContent = ''; }, 2000);
          });
      } else {
          // Fallback might be complex - maybe just show error
          console.error("Clipboard API not available.");
           if (feedbackElement) feedbackElement.textContent = 'Copy not supported';
            setTimeout(() => { if (feedbackElement) feedbackElement.textContent = ''; }, 2000);
      }
  }

  // Function to attach listeners to copy citation buttons (called after modal content is set)
  function attachCopyCitationListeners(paperId, citations) {
      const citationContainer = document.getElementById(`citation-${paperId}`);
      if (!citationContainer) return;

      const feedbackSpan = document.getElementById(`copy-feedback-citation-${paperId}`);
      const copyButtons = citationContainer.querySelectorAll('.copy-citation');

      copyButtons.forEach(button => {
          // Remove old listeners if re-attaching (safer)
          button.replaceWith(button.cloneNode(true));
      });

      // Get the new buttons and add listeners
      const newCopyButtons = citationContainer.querySelectorAll('.copy-citation');
      newCopyButtons.forEach(button => {
           button.addEventListener('click', () => {
              const format = button.getAttribute('data-format');
              const textToCopy = citations[format];
              if (textToCopy) {
                  copyCitationText(textToCopy, feedbackSpan, button);
              } else {
                  console.warn(`Citation format ${format} not found for paper ${paperId}`);
              }
          });
      });
  }



  // Function to simulate downloading a paper
  // In a real app, this would link to the actual PDF file
  window.downloadPaper = (paperId) => {
      console.log(`Download requested for paper ID: ${paperId}`);
      // Example: Find paper data and get its PDF link
      if (window.getPaperById) {
          const paper = window.getPaperById(paperId);
          if (paper && paper.pdfLink) {
              window.location.href = paper.pdfLink; // Direct download
              window.open(paper.pdfLink, '_blank'); // Open in new tab
          } else {
              alert(`No PDF link found for paper ID: ${paperId}`);
          }
      } else {
           alert(`Download functionality not fully implemented (getPaperById missing).`);
      }
  };


  // Check for paper ID in URL when page loads
  // Use 'load' event instead of 'DOMContentLoaded' to ensure all assets including potentially
  // the papers.js script are fully loaded and parsed.
  window.addEventListener("load", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const paperIdParam = urlParams.get("paper");

    if (paperIdParam) {
      const paperId = Number.parseInt(paperIdParam, 10);
      if (!isNaN(paperId) && window.openPaperDetails) {
           // Use a small delay if needed, but often 'load' is sufficient
           // setTimeout(() => {
              window.openPaperDetails(paperId);
           // }, 100); // Reduced delay or remove if 'load' works reliably
      } else {
          console.warn(`Invalid paper ID in URL: ${paperIdParam}`);
      }
    }
  });

}); // End DOMContentLoaded