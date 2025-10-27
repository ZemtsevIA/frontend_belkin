<template>
  <section class="form3">
    <div class="banner" @mousemove="handleMouseMove">
      <img src="/images/banner-bg.png" alt="Banner background" class="banner-image" />
      <div class="banner-content" ref="content">
        <h2>СПЕЦИАЛЬНАЯ ОЦЕНКА <br/> УСЛОВИЙ ТРУДА</h2>
        <p>Профессиональное оформление документов</p>
        <button class="banner-button">Связаться с нами</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FormThree',
  mounted() {
    this.setupScrollAnimation();
  },
  methods: {
    setupScrollAnimation() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const content = entry.target.querySelector('.banner-content');
            content.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            content.style.opacity = '1';
            content.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });

      this.$nextTick(() => observer.observe(this.$el));
    },
    handleMouseMove(e) {
      const banner = e.currentTarget;
      const rect = banner.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const moveX = (x / rect.width - 0.5) * 20;
      const moveY = (y / rect.height - 0.5) * 20;
      banner.querySelector('.banner-image').style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
    }
  }
}
</script>

<style scoped>
.form3 {
  top: 7vh;
  width: 100%;
  height: fit-content;
  position: relative;
  overflow: hidden;
  
}

.banner {
  position: relative;
  width: 100%;
  height: 50vh; /* Фиксированная высота, чтобы баннер был полностью видим */
  max-height: 400px; /* Ограничение максимальной высоты для больших экранов */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  overflow: hidden;
  cursor: pointer;
}

.banner-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  
  filter: brightness(45%);

  transition: transform 0.6s ease-out;
  transform: scale(1.05);
}

.banner-content {
    width: 70%;
  position: relative;
  z-index: 1;
  text-align: center;
  color: #fff;
  padding: 20px;

  opacity: 0;
  transform: translateY(30px);
}

.banner-content h2 {
  font-family: 'Nekst-SemiBold', sans-serif;
  font-size: clamp(2.9rem, 3.5vw, 4rem);
  margin-bottom: 2vh;
  line-height: 1.1;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.9);
}

.banner-content p {
  font-family: 'Nekst-Medium', sans-serif;
  font-size: clamp(1.2rem, 1.5vw, 2rem);
  margin-bottom: 3vh;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}

.banner-button {
  background-color: #fff;
  color: #5552E8;
  border: none;
  padding: clamp(15px, 1vw, 100px) clamp(20px, 2.5vw, 250px); /* Пропорциональные отступы */
  border-radius: 25px;
  cursor: pointer;
  font-size: clamp(0.5rem, 1.1vw, 1.3rem); /* Пропорциональный размер шрифта */
  transition: 0.7s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.7);
  font-family: 'Nekst-Light', sans-serif;

  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}


.banner-button:hover {
  /*background-color: #f5f7fa;*/
  box-shadow: 0 4px 12px rgba(0, 0, 0, 1.0);
}


.banner-button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.6s ease, height 0.6s ease;
  z-index: -1;
}

.banner-button:hover::before {
  width: 300px;
  height: 300px;
}

.banner-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.8);

}


.banner-content {
  opacity: 0;
  transform: translateY(30px);
}

.banner-image {
  transition: transform 0.6s ease-out;
  transform: scale(1.05);
}

.banner-button {
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

.banner-button::before {
  content: '';
  position: absolute;
  top: 50%; left: 50%;
  width: 0; height: 0;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.6s ease, height 0.6s ease;
  z-index: -1;
}

.banner-button:hover::before {
  width: 300px;
  height: 300px;
}

.banner-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.8);
}

/* Адаптивность для мобильных устройств */
@media (max-width: 768px) {
  .banner {
    height: 40vh; /* Уменьшаем высоту баннера */
    max-height: 300px; /* Ограничиваем максимальную высоту */
    min-height: 200px; /* Устанавливаем минимальную высоту для читаемости */
  }

  .banner-content {
    width: 90%; /* Увеличиваем ширину для мобильных */
    padding: 15px; /* Уменьшаем отступы */
  }

  .banner-content h2 {
    font-size: clamp(1.5rem, 5vw, 2rem); /* Уменьшаем размер шрифта */
    margin-bottom: 1.5vh; /* Уменьшаем отступ снизу */
    line-height: 1.2; /* Улучшаем читаемость */
  }

  .banner-content p {
    font-size: clamp(0.9rem, 3vw, 1.1rem); /* Уменьшаем размер шрифта */
    margin-bottom: 2vh; /* Уменьшаем отступ снизу */
  }

  .banner-button {
    font-size: clamp(0.9rem, 3vw, 1rem); /* Увеличиваем читаемость текста кнопки */
    padding: clamp(8px, 2vw, 12px) clamp(15px, 4vw, 25px); /* Уменьшаем отступы */
    border-radius: 20px; /* Делаем кнопку чуть менее округлой */
    transition: transform 0.3s ease, box-shadow 0.3s ease; /* Добавляем плавный переход */
  }

  .banner-button:hover {
    transform: scale(1.05); /* Лёгкое увеличение при наведении */
  }
}
</style>