document.addEventListener("DOMContentLoaded", () => {
  // Add these functions at the top of the document.addEventListener callback:

  // Make papers data and functions globally available
  window.getAllPapers = () => papers
  window.renderPapers = renderPapers
  window.renderAllPapers = () => renderPapers(papers)
  window.getPaperById = (id) => papers.find((paper) => paper.id === id)

  // Sample paper data
  const papers = [
    {
      id: 1,
      title: "Naman’s Divisor Sum Theorem",
      authors: "Naman Chaudhary",
      category: "Mathematics",
      abstract:
        "This paper introduces Naman's Divisor Sum Theorem, which lays forth a basic connection between a positive integer n's number of divisors (d(n)) and the sum of its divisors (W(n).  W(n)≥d(n) is satisfied by the sum of the divisors of any positive integer n, according to the theorem. This equality is only true if and when n is square-free.  The structural characteristics of divisors and the function of square-free integers in divisor functions are clarified by this conclusion.  Utilizing basic number-theoretic methods, the proof provides a fresh viewpoint on how divisor sums behave across various integer classes.  The theorem's implications in other areas of number theory, such as multiplicative functions, divisor functions, and the analysis of integer factorizations, are further examined.",
      date: "2025-04-02",
      citations: 42,
      image: "./images/cover.png?height=200&width=300",
      pdfLink: "../research_papers/Naman's Divisor Sum Theorem.pdf", // Add the PDF link here
    },
  ]

  // Function to render papers
  function renderPapers(papersList) {
    const papersContainer = document.getElementById("papers-container")

    if (!papersContainer) return

    papersContainer.innerHTML = ""

    papersList.forEach((paper) => {
      const paperCard = document.createElement("div")
      paperCard.className = "paper-card"
      paperCard.innerHTML = `
                <div class="paper-image">
                    <img src="${paper.image}" alt="${paper.title}">
                </div>
                <div class="paper-content">
                    <span class="paper-category">${paper.category}</span>
                    <h3 class="paper-title">${paper.title}</h3>
                    <p class="paper-authors">${paper.authors}</p>
                    <p class="paper-abstract">${paper.abstract}</p>
                    <div class="paper-meta">
                        <div class="paper-date">
                            <i class="fas fa-calendar"></i> ${paper.date}
                        </div>
                        <div class="paper-citations">
                            <i class="fas fa-quote-right"></i> ${paper.citations} citations
                        </div>
                    </div>
                    <div class="paper-actions">
                        <button class="action-btn" onclick="openPaperDetails(${paper.id})">
                            <i class="fas fa-book-open"></i> Read More
                        </button>
                        <button class="action-btn">
                            <i class="fas fa-bookmark"></i> Save
                        </button>
                    </div>
                </div>
            `

      papersContainer.appendChild(paperCard)
    })
  }

  // Initial render of papers
  renderPapers(papers)

  // Sort functionality
  const sortOptions = document.getElementById("sort-options")
  if (sortOptions) {
    sortOptions.addEventListener("change", function () {
      const sortBy = this.value
      const sortedPapers = [...papers]

      switch (sortBy) {
        case "recent":
          sortedPapers.sort((a, b) => new Date(b.date) - new Date(a.date))
          break
        case "cited":
          sortedPapers.sort((a, b) => b.citations - a.citations)
          break
        case "relevance":
          // In a real app, this would use a relevance algorithm
          // For demo, we'll just use the original order
          break
      }

      renderPapers(sortedPapers)
    })
  }

  // Filter functionality
  const filterBtns = document.querySelectorAll(".filter-btn")
  if (filterBtns.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const filter = this.getAttribute("data-filter")

        // Reset all filter buttons
        filterBtns.forEach((b) => b.classList.remove("active"))
        this.classList.add("active")

        if (filter === "all") {
          renderPapers(papers)
        } else {
          const filteredPapers = papers.filter((paper) => {
            return paper.category.toLowerCase().includes(filter)
          })
          renderPapers(filteredPapers)
        }
      })
    })
  }
})

