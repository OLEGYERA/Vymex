import Binder from "@/LTE/Core/Helpers/Binder";
import {encrypt, objectToArray, serialize, utf8ToArray, numberToArray} from '@/LTE/Core/Helpers/utilites';

class Company extends Binder{
  constructor() {
    super();
  }

  async activities() {
    this.$socket.emit('listener', await encrypt(...arguments[1]))
  }

  activitiesRes(activities) {
    this.$store.name('Company').set('Activities', activities)
  }

  async create() {
    const CreatorData = this.$store.name('Company').get('Creator');
    let data = serialize(
      utf8ToArray(CreatorData.name),
      utf8ToArray(CreatorData.link),
      numberToArray(String(CreatorData.country.phoneIdent)),
      utf8ToArray(CreatorData.city),
      utf8ToArray(CreatorData.street),
      utf8ToArray(CreatorData.house),
      utf8ToArray(CreatorData.apartment),
      utf8ToArray(CreatorData.office),
      utf8ToArray(String(CreatorData.country.phoneIdent) + String(CreatorData.phone.withoutMask)),
      utf8ToArray(CreatorData.about), //не работает about
      utf8ToArray('UAH'),
      numberToArray(CreatorData.logo),
      objectToArray(CreatorData.checkedActivities),
    );
    this.$socket.emit('listener', await encrypt(...arguments[1], data));
  }
  async createRes() {
    //ооооочень огромный костыль Бэкэнда
    await this.getUserCompanies(null, [arguments[1][0], 'Company', 'getUserCompanies']);
  }


  async get(id){
    this.$store.name('Company').set('CurrentCompanyBase', null);
    this.$socket.emit('listener', await encrypt(...arguments[1], numberToArray(id)));
  }
  getRes(company){
    this.$store.name('Company').set('CurrentCompanyBase', company);
  }

  async getUserWorkers(companyId){
    this.$store.name('Company').set('CurrentCompanyWorkers', null);
    this.$socket.emit('listener', await encrypt(...arguments[1], numberToArray(companyId)));
  }
  getUserWorkersRes(workers){
    this.$store.name('Company').set('CurrentCompanyWorkers', workers);
  }

  async getUserCompanies() {
    this.$socket.emit('listener', await encrypt(...arguments[1]));
  }
  getUserCompaniesRes(companies) {
    this.$store.name('Company').set('All', companies)

    let activeCompany = this.$store.name('Company').get('ActiveCompany')
    if (activeCompany.id) {
      this.$store.name('Company').set('ActiveCompany', activeCompany.id)
    }
  }

  async getCompanyTeam(companyId) {
    this.$socket.emit('listener', await encrypt(...arguments[1], numberToArray(companyId)));
  }

  getCompanyTeamRes(team) {
    this.$store.name('Company').set('CompanyTeam', team)
  }

  async getStructure(companyId) {
    this.$socket.emit('listener', await encrypt(...arguments[1], numberToArray(companyId)));
  }

  getStructureRes(str) {
    this.$store.name('Company').set('Structure', str)
  }

  async getUserInfo(params) {
    let data = serialize(
      numberToArray(params.userId),
      numberToArray(params.companyId)
    )
    this.$socket.emit('listener', await encrypt(...arguments[1], data));
  }

  getUserInfoRes(info) {
    this.$store.name('Company').set('UserInfo', info)
  }
}

export default new Company();