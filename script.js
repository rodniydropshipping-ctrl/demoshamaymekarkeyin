// ================================================
// FORM VALIDATION & HANDLING
// ================================================

const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

// Validation rules
const validationRules = {
    fullName: {
        required: true,
        minLength: 2,
        pattern: /^[א-ת\s]+$/,
        errorMessages: {
            required: 'שם מלא הוא שדה חובה',
            minLength: 'השם חייב להיות לפחות 2 תווים',
            pattern: 'השם may contain Hebrew letters and spaces only'
        }
    },
    phone: {
        required: true,
        pattern: /^(05|04|02|03|08|09)\d{1,2}-?\d{3}-?\d{4}$/,
        errorMessages: {
            required: 'טלפון הוא שדה חובה',
            pattern: 'אנא הכנסו מספר טלפון תקין (למשל: 05X-XXXXXXX)'
        }
    },
    email: {
        required: false,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        errorMessages: {
            pattern: 'אנא הכנסו כתובת דוא"ל תקינה'
        }
    },
    propertyType: {
        required: true,
        errorMessages: {
            required: 'בחרו סוג נכס'
        }
    },
    message: {
        required: false,
        maxLength: 1000,
        errorMessages: {
            maxLength: 'ההודעה לא יכולה להיות יותר מ-1000 תווים'
        }
    }
};

/**
 * Validate a single field
 */
function validateField(fieldName, value) {
    const rules = validationRules[fieldName];
    if (!rules) return { valid: true };

    // Check required
    if (rules.required && (!value || value.trim() === '')) {
        return {
            valid: false,
            error: rules.errorMessages.required
        };
    }

    // If not required and empty, skip other validations
    if (!rules.required && (!value || value.trim() === '')) {
        return { valid: true };
    }

    // Check minimum length
    if (rules.minLength && value.length < rules.minLength) {
        return {
            valid: false,
            error: rules.errorMessages.minLength
        };
    }

    // Check maximum length
    if (rules.maxLength && value.length > rules.maxLength) {
        return {
            valid: false,
            error: rules.errorMessages.maxLength
        };
    }

    // Check pattern
    if (rules.pattern && !rules.pattern.test(value)) {
        return {
            valid: false,
            error: rules.errorMessages.pattern
        };
    }

    return { valid: true };
}

/**
 * Display error message for a field
 */
function showFieldError(fieldName, errorMessage) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(fieldName + 'Error');

    if (errorMessage) {
        field.classList.add('error');
        errorElement.textContent = errorMessage;
        errorElement.classList.add('show');
    } else {
        field.classList.remove('error');
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
}

/**
 * Validate entire form
 */
function validateForm() {
    let isValid = true;
    const formData = new FormData(contactForm);

    for (const [fieldName, value] of formData.entries()) {
        const validation = validateField(fieldName, value);
        
        if (!validation.valid) {
            isValid = false;
            showFieldError(fieldName, validation.error);
        } else {
            showFieldError(fieldName, '');
        }
    }

    return isValid;
}

/**
 * Clear form
 */
function clearForm() {
    contactForm.reset();
    
    // Clear all error messages
    for (const fieldName in validationRules) {
        showFieldError(fieldName, '');
    }
}

/**
 * Handle form submission
 */
function handleFormSubmit(e) {
    e.preventDefault();

    // Show success message
    formSuccess.style.display = 'block';

    // Clear form
    clearForm();

    // Collect form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Log to console (in production, send to server)
    console.log('Form submitted with data:', data);

    // Here you would send the data to your backend
    // Example:
    // fetch('/api/contact', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data)
    // })
    // .then(response => response.json())
    // .then(result => {
    //     console.log('Success:', result);
    //     formSuccess.style.display = 'block';
    //     clearForm();
    // })
    // .catch(error => console.error('Error:', error));

    // Hide success message after 6 seconds
    setTimeout(() => {
        formSuccess.style.display = 'none';
    }, 6000);
}

/**
 * Real-time field validation
 */
function setupFieldValidation() {
    const fields = ['fullName', 'phone', 'email', 'propertyType', 'message'];

    fields.forEach(fieldName => {
        const field = document.getElementById(fieldName);

        if (field) {
            field.addEventListener('blur', () => {
                const validation = validateField(fieldName, field.value);
                showFieldError(fieldName, validation.valid ? '' : validation.error);
            });

            // Clear error on focus
            field.addEventListener('focus', () => {
                showFieldError(fieldName, '');
            });
        }
    });
}

/**
 * Initialize form event listeners
 */
function initializeForm() {
    if (!contactForm) return;

    // Form submission
    contactForm.addEventListener('submit', handleFormSubmit);

    // Real-time validation
    setupFieldValidation();
}

// ================================================
// SMOOTH SCROLL NAVIGATION
// ================================================

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Only prevent default for internal links
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ================================================
// WHATSAPP BUTTON CONFIGURATION
// ================================================

const whatsappButton = document.querySelector('.whatsapp-button');
if (whatsappButton) {
    // Update with your WhatsApp number
    // Format: https://wa.me/COUNTRY_CODE+PHONE_NUMBER
    whatsappButton.href = 'https://wa.me/972501234567?text=שלום, הייתי רוצה לברר באודות השמאות שלכם';
}

// ================================================
// HEADER SHADOW ON SCROLL
// ================================================

const header = document.querySelector('.header');

function handleScroll() {
    if (header) {
        if (window.scrollY > 10) {
            header.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
        }
    }
}

window.addEventListener('scroll', handleScroll);

// ================================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ================================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards and items
document.querySelectorAll('.spec-card, .benefit-item, .process-step, .trust-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(element);
});

// ================================================
// INITIALIZATION
// ================================================

document.addEventListener('DOMContentLoaded', () => {
    initializeForm();
    handleScroll();
});

// ================================================
// UTILITY FUNCTIONS
// ================================================

/**
 * Get form data as JSON
 */
function getFormData() {
    const formData = new FormData(contactForm);
    return Object.fromEntries(formData);
}

/**
 * Check if form is valid
 */
function isFormValid() {
    return validateForm();
}

/**
 * Submit form programmatically
 */
function submitForm() {
    if (validateForm()) {
        contactForm.dispatchEvent(new Event('submit'));
    }
}

// Export for use in other scripts if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateField,
        validateForm,
        getFormData,
        isFormValid,
        submitForm,
        clearForm
    };
}
