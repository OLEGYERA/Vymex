<template>
  <div class="resource-material-info-view">
    <comeback @onClick="$router.push({name: 'vx.resource.material.resources'})"/>
    <div class="info-header-group">
      <title-base>{{object.name}}</title-base>
      <icon-points-vertical @click.native="actionListStatus = !actionListStatus" ref="list"/>
      <modal-action-list
          status="actionListStatus"
          :actions="actions"
          @onList="performAction"
          @onClose="actionListStatus=false"
      />
    </div>
    <title-caption class="resource-number">{{object.number}}</title-caption>
    <text-base>{{object.description}}</text-base>
    <div class="resource-price">
      <title-semi>$ {{object.price}}</title-semi>
      <title-caption>Стоимость ресурса</title-caption>
    </div>
    <div class="resource-main-info">
      <div class="resource-owner">
        <header-add>
          <template #header-title>Владелец</template>
          <template #header-amount>1</template>
        </header-add>
        <company :company="object.owner"/>
      </div>
      <div class="resource-user">
        <header-add>
          <template #header-title>Пользователь</template>
          <template #header-amount>1</template>
        </header-add>
        <structural-unit :user="object.user"/>
      </div>
    </div>
    <header-add>
      <template #header-title>изображения</template>
      <template #header-amount>2</template>
    </header-add>
    <file v-for="(file, key) in object.files" :file="file" :key="key"/>
  </div>
</template>

<script>
  import Comeback from "@Facade/Navigation/Comeback";
  import TitleBase from "@Facade/Title/Base"
  import TitleCaption from "@Facade/Title/Caption"
  import TextBase from "@Facade/Text/Base"
  import TitleSemi from "@Facade/Title/Semi"
  import HeaderAdd from "@/LTE/Singletons/facades/HeaderAdd";
  import Company from "@/LTE/Singletons/Resources/facades/Company";
  import StructuralUnit from "@/LTE/Singletons/Dashboard/facades/StructuralUnit";
  import IconPointsVertical from "@Icon/PointsVertical"
  import ModalActionList from "@Facade/Modal/ActionList";
  import File from "@/LTE/Singletons/Resources/facades/File";

  export default {
    name: 'vx.resource.material.info',
    components: {
      Comeback,
      TitleBase,
      TitleCaption,
      TextBase,
      TitleSemi,
      HeaderAdd,
      Company,
      StructuralUnit,
      ModalActionList,
      IconPointsVertical,
      File,
    },
    data() {
      return{
        actionListStatus: false,
        object: null,
        actions: ['Редактировать', 'Отправить на склад'],
        materialObjects: [
          {
            id: 1,
            name : 'Монитор HP Horus 27 inc.',
            number: 'ABK2921BDSFLBS',
            description: 'Простой для понимания документ - документ, не требующий усилий для чтения и понимания, т.е. при изложении материала не используются сложные предложения',
            user: {
              name: 'Дмитрий Соколов',
              position: 'Космонавт',
              level: 1,
              img: require('@/assets/img/my/process.svg')
            },
            owner: {
              name: 'Sharashkina Kontora',
              img: require('@/assets/img/my/process.svg')
            },
            price: '3000',
            files: [
              {
                title : 'doc.vmx',
                content: {
                  size: '2,1',
                  date: '02.03.2020'
                },
                type: null,
                group: null,
              },
              {
                title : 'doc.vmx',
                content: {
                  size: '2,1',
                  date: '02.03.2020'
                },
                type: null,
                group: true,
              },
              {
                title : 'doc.zip',
                content: {
                  size: '2,1',
                  date: '02.03.2020'
                },
                type: 'zip',
                group: null,
              },
            ]
          },
          {
            id: 2,
            name : 'iMac 27 inch. 2015',
            number: 'ABK2921BDSFLBS',
            description: 'Простой для понимания документ - документ, не требующий усилий для чтения и понимания, т.е. при изложении материала не используются сложные предложения',
            user: {
              name: 'Дмитрий Соколов',
              position: 'Космонавт',
              level: 2,
              img: require('@/assets/img/my/process.svg')
            },
            owner: {
              name: 'Sharashkina Kontora',
              img: require('@/assets/img/my/process.svg'),
            },
            price: '3000',
            files: [
              {
                title : 'doc.vmx',
                content: {
                  size: '2,1',
                  date: '02.03.2020'
                },
                type: null,
                group: null,
              },
              {
                title : 'doc.vmx',
                content: {
                  size: '2,1',
                  date: '02.03.2020'
                },
                type: null,
                group: true,
              },
              {
                title : 'doc.zip',
                content: {
                  size: '2,1',
                  date: '02.03.2020'
                },
                type: 'zip',
                group: null,
              },
            ]
          },
          {
            id: 3,
            name : 'Молоток',
            number: 'ABK2921BDSFLBS',
            description: 'Простой для понимания документ - документ, не требующий усилий для чтения и понимания, т.е. при изложении материала не используются сложные предложения',
            user: {
              name: 'Дмитрий Соколов',
              position: 'Космонавт',
              level: 4,
              img: require('@/assets/img/my/process.svg')
            },
            owner: {
              name: 'Sharashkina Kontora',
              img: require('@/assets/img/my/process.svg'),
            },
            price: '3000',
            files: [
              {
                title : 'doc.vmx',
                content: {
                  size: '2,1',
                  date: '02.03.2020'
                },
                type: null,
                group: null,
              },
              {
                title : 'doc.vmx',
                content: {
                  size: '2,1',
                  date: '02.03.2020'
                },
                type: null,
                group: true,
              },
              {
                title : 'doc.zip',
                content: {
                  size: '2,1',
                  date: '02.03.2020'
                },
                type: 'zip',
                group: null,
              },
            ]
          },
          {
            id: 4,
            name : 'Монитор HP Horus 27 inc.',
            number: 'ABK2921BDSFLBS',
            description: 'Простой для понимания документ - документ, не требующий усилий для чтения и понимания, т.е. при изложении материала не используются сложные предложения',
            user: {
              name: 'Дмитрий Соколов',
              position: 'Космонавт',
              level: 1,
              img: require('@/assets/img/my/process.svg')
            },
            owner: {
              name: 'Sharashkina Kontora',
              img: require('@/assets/img/my/process.svg'),
            },
            price: '3000',
            files: [
              {
                title : 'doc.vmx',
                content: {
                  size: '2,1',
                  date: '02.03.2020'
                },
                type: null,
                group: null,
              },
              {
                title : 'doc.vmx',
                content: {
                  size: '2,1',
                  date: '02.03.2020'
                },
                type: null,
                group: true,
              },
              {
                title : 'doc.zip',
                content: {
                  size: '2,1',
                  date: '02.03.2020'
                },
                type: 'zip',
                group: null,
              },
            ]
          },
          {
            id: 5,
            name : 'iMac 27 inch. 2015',
            number: 'ABK2921BDSFLBS',
            description: 'Простой для понимания документ - документ, не требующий усилий для чтения и понимания, т.е. при изложении материала не используются сложные предложения',
            user: {
              name: 'Дмитрий Соколов',
              position: 'Космонавт',
              level: 3,
              img: require('@/assets/img/my/process.svg')
            },
            owner: {
              name: 'Sharashkina Kontora',
              img: require('@/assets/img/my/process.svg')
            },
            price: '3000',
            files: [
              {
                title : 'doc.vmx',
                content: {
                  size: '2,1',
                  date: '02.03.2020'
                },
                type: null,
                group: null,
              },
              {
                title : 'doc.vmx',
                content: {
                  size: '2,1',
                  date: '02.03.2020'
                },
                type: null,
                group: true,
              },
              {
                title : 'doc.zip',
                content: {
                  size: '2,1',
                  date: '02.03.2020'
                },
                type: 'zip',
                group: null,
              },
            ]
          },
          {
            id: 6,
            name : 'Монитор HP Horus 27 inc.',
            number: 'ABK2921BDSFLBS',
            description: 'Простой для понимания документ - документ, не требующий усилий для чтения и понимания, т.е. при изложении материала не используются сложные предложения',
            user: {
              name: 'Дмитрий Соколов',
              position: 'Космонавт',
              level: 3,
              img: require('@/assets/img/my/process.svg')
            },
            owner: {
              name: 'Sharashkina Kontora',
              img: require('@/assets/img/my/process.svg')
            },
            price: '3000',
            files: [
              {
                title : 'doc.vmx',
                content: {
                  size: '2,1',
                  date: '02.03.2020'
                },
                type: null,
                group: null,
              },
              {
                title : 'doc.vmx',
                content: {
                  size: '2,1',
                  date: '02.03.2020'
                },
                type: null,
                group: true,
              },
              {
                title : 'doc.zip',
                content: {
                  size: '2,1',
                  date: '02.03.2020'
                },
                type: 'zip',
                group: null,
              },
            ]
          },
          {
            id: 7,
            name : 'iMac 27 inch. 2015',
            number: 'ABK2921BDSFLBS',
            description: 'Простой для понимания документ - документ, не требующий усилий для чтения и понимания, т.е. при изложении материала не используются сложные предложения',
            user: {
              name: 'Дмитрий Соколов',
              position: 'Космонавт',
              level: 2,
              img: require('@/assets/img/my/process.svg')
            },
            owner: {
              name: 'Sharashkina Kontora',
              img: require('@/assets/img/my/process.svg')
            },
            price: '3000',
            files: [
              {
                title : 'doc.vmx',
                content: {
                  size: '2,1',
                  date: '02.03.2020'
                },
                type: null,
                group: null,
              },
              {
                title : 'doc.vmx',
                content: {
                  size: '2,1',
                  date: '02.03.2020'
                },
                type: null,
                group: true,
              },
              {
                title : 'doc.zip',
                content: {
                  size: '2,1',
                  date: '02.03.2020'
                },
                type: 'zip',
                group: null,
              },
            ]
          },
          {
            id: 8,
            name : 'Монитор HP Horus 27 inc.',
            number: 'ABK2921BDSFLBS',
            description: 'Простой для понимания документ - документ, не требующий усилий для чтения и понимания, т.е. при изложении материала не используются сложные предложения',
            user: {
              name: 'Дмитрий Соколов',
              position: 'Космонавт',
              level: 4,
              img: require('@/assets/img/my/process.svg')
            },
            owner: {
              name: 'Sharashkina Kontora',
              img: require('@/assets/img/my/process.svg')
            },
            price: '3000',
            files: [
              {
                title : 'doc.vmx',
                content: {
                  size: '2,1',
                  date: '02.03.2020'
                },
                type: null,
                group: null,
              },
              {
                title : 'doc.vmx',
                content: {
                  size: '2,1',
                  date: '02.03.2020'
                },
                type: null,
                group: true,
              },
              {
                title : 'doc.zip',
                content: {
                  size: '2,1',
                  date: '02.03.2020'
                },
                type: 'zip',
                group: null,
              },
            ]
          },
        ]
      }
    },
    created() {
      this.object = this.materialObjects.find(el => el.id === this.$route.params.id)
    },
    methods: {
      performAction(key) {
        switch (key) {
        case 0: this.$router.push({name: 'vx.resource.editing', params: {resourceId: this.$route.params.id}});
        break;
        case 1:
          this.$router.push({name: 'vx.resource.material.resources', params: {resourceId: this.$route.params.id}})
                this.materialObjects.splice(+this.$route.params.id, 1)
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  .resource-material-info-view {
    width: 100%;
    .info-header-group {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: rem(8);
      .icon-points-vertical{
        color: #fff;
        padding: 0 rem(10);
        height: 16px;
        cursor: pointer;
      }
      .facade-modal-action-list{
        top: 24px;
        right: 4px;
      }
    }
    .resource-number{
      margin-bottom: rem(24);
    }
    .facade-text-base {
      margin-bottom: rem(24);
      color: #fff;
    }
    .resource-price {
      padding: rem(20) 0;
      margin-bottom: rem(48);
      text-align: center;
      border-radius: 12px;
      background-color: $grey-scale-400;
      .facade-title-semi {
        margin-bottom: rem(4);
      }
    }
    .resource-main-info {
      margin-bottom: rem(24);
      display: flex;
      .resource-owner {
        margin-right: rem(24);
        width: 100%;
      }
      .resource-user {
        width: 100%;
      }
    }
    .facade-header-add::v-deep {
      margin-bottom: rem(4);
      padding: rem(8) 0;
      .icon-add {
        display: none;
      }
    }
    .facade-resource-file {
      margin-bottom: rem(8);
    }
    .container-sidebar-structure-unit::v-deep{
      .facade-input-checkbox {
        display: none;
      }
    }
  }
</style>