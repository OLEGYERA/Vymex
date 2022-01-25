import Auth from "./Auth";
import Setting from "./Setting";
import Api from "./Api";
import FAQ from "./Faq";
import Uploader from "./Uploader";

import {MessengerComponents} from '@Singletons';

export default Object.assign({
  Auth, Setting, Api, FAQ, Uploader
}, MessengerComponents)