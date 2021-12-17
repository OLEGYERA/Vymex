<template>
  <div class="static-demo">
    <div class="demo-preview-install-box">
      <div class="vymex-logo">
        <img src="@/assets/img/vymex/base.png" alt="">
      </div>
      <h2 class="demo-title">У вас еще нет учетной <br> записи?</h2>
      <div class="vymex-preview-img">
        <img class="vymex-plate-logo" src="@/assets/img/vymex/plates.png" alt="">
        <div class="vymex-qr-box">
          <img src="@/assets/img/QR.png" alt="">
        </div>
        <div class="preview-helper-text">
          Наведите камеру смартфона для <br> быстрой загрузки
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'auth.static.demo'
  }
</script>

<style lang="scss" scoped>
  .static-demo{
    display: flex;
    align-items: center;
    width: 100%;
    min-width: 500px;
    height: 100%;
    padding: 5rem 0;
    box-sizing: border-box;
    background: url("~@/assets/img/bg/static-demo.png"), linear-gradient(332.46deg, #1C3049 1.02%, #181F26 57.57%, #1890FF 225.95%);
    background-size: cover;
    overflow: hidden;

    .demo-preview-install-box{
      position: relative;
      width: 100%;
      .vymex-logo{
        padding: 0 7rem;
        margin-bottom: 40px;
      }
      .demo-title{
        padding: 0 7rem;
        font-size: 28px;
        line-height: 34px;
        font-weight: 600;
        color: #fff;
        margin: 0 0 rem(72);
        position: relative;
        z-index: 1;
      }
      .vymex-preview-img{
        display: flex;
        justify-content: center;
        align-items: flex-end;
        position: relative;
        height: 55vh;
        width: 100%;
        img.vymex-plate-logo{
          margin-left: 3rem;
          height: 80vh;
          object-fit: fill;
          position: absolute;
          margin-bottom: -2rem;
        }
        .vymex-qr-box{
          left: 7rem;
          bottom: 20%;
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          padding: 25px;
          z-index: 1;
          img{
            width: 160px;
          }
          &:before{
            z-index: -1;
            content: '';
            position: absolute;
            background: rgba(74, 90, 106, 0.1);
            backdrop-filter: blur(30px);
            border-radius: 20px;
            width: 100%;
            height: 100%;
          }
        }
      }
      .preview-helper-text{
        width: 100%;
        padding: 0 7rem;
        font-size: 15px;
        font-weight: 400;
        line-height: 20px;
        color: $grey-scale-200;
      }
    }

  }
  //(min-width: 1200px) and
  @media (max-width: 1400px) {
    .static-demo{
      .demo-preview-install-box{
        .vymex-logo{
          padding: 0 5rem;
        }
        .demo-title{
          padding: 0 5rem;
          margin: 0 0 rem(54);
        }
        .vymex-preview-img {
          height: 48vh;

          img.vymex-plate-logo {
            margin-bottom: rem(-60);
          }

          .vymex-qr-box{
            left: 5rem;
            bottom: 18%;
            img{
              width: 140px;
            }
          }
        }
        .preview-helper-text{
          padding: 0 5rem;
        }
      }
    }
  }
</style>