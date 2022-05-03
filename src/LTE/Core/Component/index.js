import Auth from "./Auth";
import Setting from "./Setting";
import Cofounders from "./Cofounders";
import Api from "./Api";
import FAQ from "./Faq";
import Uploader from "./Uploader";
import Company from "./Company";
import Processes from "./Processes";
import Resources from "./Resources";
import Support from "./Support";
import CompanyDraft from "./CompanyDraft";

import {MessengerControllers} from '@Singletons';

export default Object.assign({
  Auth, Setting, Api, FAQ, Uploader, Company, Processes, Cofounders, Resources, Support, CompanyDraft
}, MessengerControllers)