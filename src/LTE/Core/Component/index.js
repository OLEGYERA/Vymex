import Auth from "./Auth";
import Setting from "./Setting";
import Cofounders from "./Cofounders";
import Api from "./Api";
import FAQ from "./Faq";
import Uploader from "./Uploader";
import Company from "./Company";
import Resources from "./Resources"

import {MessengerControllers} from '@Singletons';

export default Object.assign({
  Auth, Setting, Cofounders, Api, FAQ, Uploader, Company, Resources
}, MessengerControllers)