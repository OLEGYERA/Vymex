import Binder from "@/LTE/Core/Helpers/Binder";
import {concatArrays, encrypt, utf8ToArray, ed25519, serialize, hexToArray, arrayToHex, ecies25519, numberToArray} from "@/LTE/Core/Helpers/utilites";

class Setting extends Binder{
  constructor() {
    super();
  }

  async checkAlias(newAlias){
    this.$socket.emit('listener', await encrypt(...arguments[1], utf8ToArray(String(newAlias).replace(/@/i, ''))));
  }

  async checkAliasRes(data){
    let aliasError = data?.errors?.[Object.keys(data?.errors)]?.[0];
    this.$store.set('UserAliasError', aliasError || null);
  }

  async fillProfile(){
    let concatPasswordAT = concatArrays(utf8ToArray(this.$store.get('UserPassword')), hexToArray(this.$store.get('AT')))
    let signPassword = await ed25519.sign(concatPasswordAT, this.$store.get('Dask'));
    let newAT = concatArrays(hexToArray(this.$store.get('AT')), ecies25519.randomBytes(32));
    this.$store.set('AT', arrayToHex(newAT));
    let data = serialize(
      utf8ToArray(String(this.$store.get('UserName'))),
      utf8ToArray(String(this.$store.get('UserLastname'))),
      utf8ToArray(String(this.$store.get('UserAlias').replace(/@/i, ''))),
      utf8ToArray(String(this.$store.get('UserPassword'))),
      newAT, signPassword
    );
    this.$socket.emit('listener', await encrypt(...arguments[1], data));
  }
  async fillProfileRes(data){
    if(!data.length) {
      await this.$router.push({name: 'vx'})
      this.$store.set('UserJumpReg', true)
    }
  }

  async cloudPassword(password){
    const newPassword =  utf8ToArray(password);
    this.$store.set('UserPassword', newPassword);
    let newAT = concatArrays(hexToArray(this.$store.get('AT')), ecies25519.randomBytes(32));
    let signPassword = await ed25519.sign(concatArrays(newPassword, newAT), this.$store.get('Dask'));
    this.$store.set('TempAT', arrayToHex(newAT));
    this.$socket.emit('listener', await encrypt(
      arguments[1][0],
      'ThirdEra',
      arguments[1][2],
      serialize(newPassword, newAT, signPassword))
    );
  }

  //Profile funcs
  async editAvatar(avatarId){
    this.$socket.emit('listener', await encrypt(...arguments[1], numberToArray(avatarId)));
  }
  async editAvatarRes({path}){
    this.$store.set('UserAvatar', path)
  }
  async editName(name){
    this.$store.set('UserName', name);
    this.$socket.emit('listener', await encrypt(...arguments[1], utf8ToArray(name)));
  }
  async editLastname(lastname){
    this.$store.set('UserLastname', lastname);
    this.$socket.emit('listener', await encrypt(...arguments[1], utf8ToArray(lastname)));
  }
  async editAlias(alias){
    let Alias = String(alias);
    this.$store.set('UserAlias', Alias);
    this.$socket.emit('listener', await encrypt(...arguments[1], utf8ToArray(Alias.replace(/@/i, ''))));
  }
  async editBirthDate(birthday){
    this.$store.set('UserBirthday', birthday);
    this.$socket.emit('listener', await encrypt(...arguments[1], utf8ToArray(birthday)));
  }
  async editAbout(about){
    this.$store.set('UserAbout', about);
    this.$socket.emit('listener', await encrypt(...arguments[1], utf8ToArray(about)));
  }

  async codeConfirmPhone() {
    this.$socket.emit('listener', await encrypt(...arguments[1]));
  }

  codeConfirmPhoneRes(response) {
    this.$store.set('PhoneCodeConfirm', response);
    console.log(response);
  }

  async codeEditPhone({telephone, phoneIdent, code}) {
    console.log(telephone, phoneIdent, code);
    let data = serialize(telephone, phoneIdent, code)
    this.$socket.emit('listener', await encrypt(...arguments[1], data));
  }

  codeEditPhoneRes(response) {
    this.$store.set('PhoneCodeConfirm', response);
    console.log(response);
  }

  async editPhone({telephone, code}) {
    let data = serialize(telephone, code)
    this.$socket.emit('listener', await encrypt(...arguments[1], data));
  }

  editPhoneRes(response) {
    console.log(response);
    this.$core.execViaComponent('Setting', 'activePhoneChange')
  }

  async activePhoneChange() {
    this.$socket.emit('listener', await encrypt(...arguments[1]));
  }

  activePhoneChangeRes(response) {
    this.$store.set('ChangePhone', response);
    console.log(response);
  }

  async cancelPhoneChange(id) {
    this.$socket.emit('listener', await encrypt(...arguments[1], id));
  }

  cancelPhoneChangeRes(response) {
   console.log(response);
  }

  async resendCodeEditPhone(telephone) {
    console.log(telephone, 'telephone');
    this.$socket.emit('listener', await encrypt(...arguments[1], telephone));
  }

  resendCodeEditPhoneRes(response) {
    console.log(response);
  }

  async phonePrivacy(showPhone) {
    this.$socket.emit('listener', await encrypt(...arguments[1], numberToArray(showPhone)));
  }

  phonePrivacyRes() {
    this.$core.execViaComponent('Auth', 'user');
    this.$notify({text: 'Изменения сохранены!', type: 'success', duration: 3000, speed: 500})
  }

  async emailPrivacy(showEmail) {
    this.$socket.emit('listener', await encrypt(...arguments[1], numberToArray(showEmail)));
  }

  emailPrivacyRes() {
    this.$core.execViaComponent('Auth', 'user');
    this.$notify({text: 'Изменения сохранены!', type: 'success', duration: 3000, speed: 500})
  }

  async getActiveSessions() {
    this.$socket.emit('listener', await encrypt(...arguments[1]));
  }

  getActiveSessionsRes(response) {
    console.log(response);
    this.$store.set('ActiveSessions', response);
  }
}

export default new Setting();