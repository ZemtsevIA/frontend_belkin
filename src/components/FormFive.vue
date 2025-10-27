<template>
  <section class="form5">
    <div class="contact-banner">
      <img src="/images/contact-bg.png" alt="Contact background" class="contact-image" />
      <div class="contact-content">
        <h2>Оцените условия труда <br /> в вашей компании</h2>
        <p>Оставьте заявку и мы свяжемся с вами</p>
        <div class="contact-info">
          <div class="contact-item" v-for="(field, key) in ['name', 'phone', 'email']" :key="key">
            <input
              :type="key === 'phone' ? 'tel' : key"
              :placeholder="key === 'name' ? 'Имя' : key === 'phone' ? '+7 (777) 777-77-77' : 'Почта'"
              v-model="form[key]"
              :class="{ 'error': errors[key] }"
              @focus="onFocus(key)"
              @blur="onBlur(key)"
            />
            <span v-if="errors[key]" class="error-message">{{ errors[key] }}</span>
          </div>
          <button 
            class="contact-button" 
            @click="submitForm" 
            :disabled="isSubmitting"
            @mouseenter="buttonHover = true"
            @mouseleave="buttonHover = false"
          >
            <span :class="{ 'sending': isSubmitting }">
              {{ isSubmitting ? 'Отправка...' : 'Получить консультацию' }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FormFive',
  data() {
    return {
      form: { name: '', phone: '', email: '' },
      errors: { name: '', phone: '', email: '' },
      isSubmitting: false,
      buttonHover: false
    };
  },
  mounted() {
    this.setupScrollAnimation();
  },
  methods: {
    setupScrollAnimation() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const content = entry.target.querySelector('.contact-content');
            content.style.transition = 'all 0.9s ease-out';
            content.style.opacity = '1';
            content.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });

      this.$nextTick(() => observer.observe(this.$el));
    },
    onFocus(field) { this.focusedField = field; },
    onBlur() { this.focusedField = null; },
    sanitizeInput(input) {
      const div = document.createElement('div');
      div.textContent = input;
      return div.innerHTML;
    },
    validateForm() {
      this.errors = { name: '', phone: '', email: '' };
      let isValid = true;

      const nameRegex = /^[a-zA-Zа-яА-Я\s-]{2,50}$/;
      if (!this.form.name.trim()) this.errors.name = 'Введите имя', isValid = false;
      else if (!nameRegex.test(this.form.name.trim())) this.errors.name = 'Имя: 2–50 букв', isValid = false;

      const phoneRegex = /^\+?\d{10,15}$/;
      if (!this.form.phone.trim()) this.errors.phone = 'Введите телефон', isValid = false;
      else if (!phoneRegex.test(this.form.phone.replace(/\D/g, ''))) this.errors.phone = 'Некорректный номер', isValid = false;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.form.email.trim()) this.errors.email = 'Введите email', isValid = false;
      else if (!emailRegex.test(this.form.email)) this.errors.email = 'Некорректный email', isValid = false;

      return isValid;
    },
    async submitForm() {
      if (!this.validateForm()) return;
      this.isSubmitting = true;

      const sanitizedForm = {
        name: this.sanitizeInput(this.form.name.trim()),
        phone_number: this.sanitizeInput(this.form.phone.trim()),
        email: this.sanitizeInput(this.form.email.trim())
      };

      try {
        const response = await fetch("http://212.192.127.152:9000/data/", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sanitizedForm)
        });

        if (!response.ok) throw new Error('Ошибка отправки');
        alert('Заявка отправлена!');
        this.form = { name: '', phone: '', email: '' };
      } catch (error) {
        alert('Ошибка: ' + error.message);
      } finally {
        this.isSubmitting = false;
      }
    }
  }
};
</script>

<style scoped>
/* Существующие стили */
.form5 {
  width: 100%;
  position: relative;
  overflow: hidden;
}

.contact-banner {
  position: relative;
  width: 100%;
  height: 60vh;
  max-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4a90e2;
}

.contact-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  filter: brightness(65%);
}

.contact-content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: #fff;
  padding: 20px;

  opacity: 0;
  transform: translateY(30px);
}

.contact-content h2 {
  font-family: 'Nekst-SemiBold', sans-serif;
  font-size: clamp(2.9rem, 4.3vw, 4.5rem);
  margin-bottom: 2vh;
  line-height: 1.1;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.9);
}

.contact-content p {
  font-family: 'Nekst-Medium', sans-serif;
  font-size: clamp(1.2rem, 1.7vw, 2rem);
  margin-bottom: 3vh;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}

.contact-info {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.contact-item {
  background-color: rgba(255, 255, 255, 0.9);
  color: #1a202c;
  width: 23%;
  padding: clamp(8px, 1.5vw, 12px);
  padding-left: 1vw;
  border-radius: 25px;
  font-family: 'Nekst-Light', sans-serif;
  font-size: clamp(14px, 1.5vw, 16px);
  text-align: left;

  transition: all 0.4s ease;
  position: relative;
}

.contact-item::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(135deg, rgba(85, 82, 232, 0.1), transparent);
  border-radius: 25px;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.contact-item input:focus + .contact-item::before,
.contact-item:hover::before {
  opacity: 1;
}

.contact-item input {
  background: none;
  border: none;
  width: 100%;
  font-family: 'Nekst-Light', sans-serif;
  font-size: clamp(14px, 1.5vw, 16px);
  color: #1a202c;
  text-align: left;
  outline: none;

  transition: all 0.3s ease;
}

.contact-item input:focus {
  transform: scale(1.02);
  font-weight: 500;
}

.contact-button {
  background-color: #5552e8;
  color: #fff;
  border: none;
  padding: clamp(8px, 1.5vw, 12px) clamp(20px, 2.5vw, 25px);
  border-radius: 25px;
  cursor: pointer;
  font-size: clamp(14px, 1.5vw, 16px);
  transition: background-color 0.3s;
  font-family: 'Nekst-Medium', sans-serif;
  text-decoration: none;

  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.contact-button:hover {
  background-color: #5a67d8;
}

.contact-button:disabled {
  background-color: #a0a0a0;
  cursor: not-allowed;
}

/* Стили для ошибок */
.error {
  border: 1px solid #ff4d4f;
}

.error-message {
  color: #ff4d4f;
  font-size: clamp(12px, 1vw, 14px);
  margin-top: 5px;
  display: block;
}

.contact-content {
  opacity: 0;
  transform: translateY(30px);
}

.contact-item {
  transition: all 0.4s ease;
  position: relative;
}

.contact-item::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(135deg, rgba(85, 82, 232, 0.1), transparent);
  border-radius: 25px;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.contact-item input:focus + .contact-item::before,
.contact-item:hover::before {
  opacity: 1;
}

.contact-item input:focus {
  transform: scale(1.02);
  font-weight: 500;
}

.contact-button {
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.contact-button::after {
  content: '';
  position: absolute;
  top: 50%; left: 50%;
  width: 0; height: 0;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.6s ease, height 0.6s ease;
}

.contact-button:hover::after {
  width: 300px;
  height: 300px;
}

.contact-button:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 25px rgba(85, 82, 232, 0.4);
}

.contact-button.sending span {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

/* Адаптивность для мобильных устройств */
@media (max-width: 768px) {
  .contact-banner {
    height: 60vh;
    max-height: 350px;
  }

  .contact-content h2 {
    font-size: clamp(1.2rem, 2.5vw, 1.8rem);
  }

  .contact-content p {
    font-size: clamp(0.9rem, 1.2vw, 1.2rem);
  }

  .contact-info {
    flex-direction: column;
    align-items: center;
  }

  .contact-item {
    width: 80%;
    font-size: clamp(12px, 1.2vw, 14px);
    padding: clamp(6px, 1vw, 10px) clamp(15px, 2vw, 20px);
  }

  .contact-button {
    font-size: clamp(14px, 1.8vw, 24px);
    padding: clamp(6px, 1vw, 10px) clamp(15px, 2vw, 20px);
  }
}
</style>