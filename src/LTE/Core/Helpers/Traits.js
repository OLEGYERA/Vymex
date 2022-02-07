export default class Traits{
  static ImageLogo(logo, lastname, name = null){
    return logo ? logo : (lastname.substr(0, 1) + (name ? name.substr(0, 1) : ''));
  }

  static ImageColorCode(id = null){
    const ID = String(id);
    return id !== null ? ID.substr(ID.length - 1, 1) : '4';
  }
}

