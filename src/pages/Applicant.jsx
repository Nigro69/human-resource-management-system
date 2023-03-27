import React, {useState, useEffect} from "react";
import {
  Accordion,
  Box,
  Button,
  Checkbox,
  Code,
  Group,
  Select,
  Stepper,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { useNavigate, useParams } from "react-router-dom";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

function Applicant() {
  const [checked, setChecked] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      cid: id,
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      mobile: undefined,
      companyName: "",
      position: "",
      applicationType: "",
      applicationTimeLimit: "",
      role: "",
      carrerLevel: "",
      grade: "",
      talentSegment: "",
      location: "",
      businessDeal: "",
      totalGrossSalary: 0,
      selfMedicalInsurance: 0,
      selfMedicalInsuranceDownPayment: 0,
      parentMedicalInsurance: 0,
      parentMedicalInsuranceDownPayment: 0,
      lifeInsurance: 0,
      relocationAllowance: 0,
      relocationAllowancePenaltyTime: "",
      fixedBasicPay: 0,
      fixedDearnessAllowance: 0,
      fixedOtherAllowance: 0,
      fixedESIC: 0,
      fixedBonus: 0,
      annualFixedPay: 0,
      flexibleIncrement: 0,
      flexibleIncentive: 0,
      flexibleAppraisal: 0,
      flexibleBonus: 0,
      annualFlexiblePay: 0,
      retirementProvidentFund: 0,
      retirementGratuity: 0,
      annualRetirementBenefits: 0,
      jobType: "",
    },
  });

  async function handleSubmit(values) {
    fetch(`http://44.204.133.124/api/v1/user/createapplicant`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then(async (res) => {
        const response = await res.json();
        return response.data;
      })
      .then((body) => {
        console.log(body, body.cid, body._id);
        // createpdf();
        createpdfdocument(body._id);
        // createpdf();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function createpdfdocument(applicantId) {
    const pdfDocGenerator = pdfMake.createPdf(docDefinition);
    pdfDocGenerator.getBuffer((buffer) => {
      if (applicantId) {
        fetch(`http://44.204.133.124/api/v1/user/createdoc/${applicantId}`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cid: form.values.cid,
            name: form.values.cid,
            mimetype: "application/pdf",
            buffer: buffer,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            navigate(`/applicant/pdf/${applicantId}`);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  }

  async function handleInternSubmit(values) {
    fetch(`http://44.204.133.124/api/v1/user/createapplicant`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // createinternpdf();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const docDefinition = {
    pageSize: "A4",
    pageOrientation: "portrait",
    pageMargins: [40, 60, 40, 60],
    header: {
      columns: [
        { text: "FAWR", alignment: "left", fontSize: 18, width: 400 },
        {
          text: `Fawr Business Solutions,
          4B, Sreevatsa Swaget,
          Patel Road, Ram Nagar,
          Coimbatore – 641 009.
          W: www.fawrbsol.com`,
          alignment: "right",
          fontSize: 8,
        },
      ],
      margin: [40, 0, 40, 40],
    },
    footer: {
      columns: [
        {
          text: "Ref: FAWR/Offer/v2.0/20210803CBHRE0071",
          alignment: "left",
          fontSize: 8,
        },
        {
          text: "...................................................",
          alignment: "right",
          fontSize: 8,
        },
      ],
      margin: [40, 0, 40, 40],
    },
    content: [
      { qr: `Name: ${form.values.firstName} ${form.values.lastName} Role: ${form.values.role} Description: ${form.values.description}`, fit: 500, pageBreak: "after" },
      // next page
      { text: `${new Date().toDateString()}`, alignment: "right" },
      { text: "To", alignment: "left" },
      { text: " " },
      {
        text: `Mr. ${form.values.firstName} ${form.values.lastName}`,
        alignment: "left",
      },
      { text: " " },
      { text: `${form.values.address1}`, alignment: "left" },
      { text: " " },
      { text: `${form.values.address2}`, alignment: "left" },
      { text: " " },
      { text: `Mobile: +91 ${form.values.mobile}`, alignment: "left" },
      { text: " " },
      {
        text: `Dear Mr. ${form.values.firstName} ${form.values.lastName} ,`,
        alignment: "left",
      },
      { text: " " },
      { text: "Greetings of the day.", alignment: "left" },
      { text: " " },
      {
        text: `In Fawr Business Solutions (Branded as Fawr B Sol), you can bring your innovative ideas and expertise together and utilizes them to help our clients with value - added benefits.Since inception, with a group of young and enthusiastic team, we offer unique and niche solutions with great added values.`,
      },
      { text: " " },
      {
        text: `We invite you to be an integral part of Fawr Business Solutions. Congratulations on being selected as Business Development Manager in our team and we believe that your creativity and expertise will fit you to our existing team who are thriving hard to create their impacts in this competitive world.`,
      },
      { text: " " },
      {
        text: `Kindly confirm your acceptance of this offer online through the option 'Accept Offer letter'. If not accepted within 48 hours, this offer is liable to lapse at the discretion of FAWR this offer will be automatically withdrawn.`,
      },
      { text: " " },
      {
        text: `After you accept this offer you will be issued a joining letter indicating the details of your joining date and initial place of posting. You will also be issued a letter of appointment at the time of your joining after completing joining formalities as per company policy. Your offer is subject to a positive BG check. 
          Regards,`,
      },
      { text: " " },
      { text: `${form.values.companyName}`, alignment: "left" },
      { text: " " },
      {
        text: `${form.values.position}`,
        alignment: "left",
        pageBreak: "after",
      },
      //next page
      { text: `${new Date().toDateString()}`, alignment: "right" },
      { text: "To", alignment: "left" },
      { text: " " },
      {
        text: `Mr. ${form.values.firstName} ${form.values.lastName}`,
        alignment: "left",
      },
      { text: " " },
      { text: `${form.values.address1}`, alignment: "left" },
      { text: " " },
      { text: `${form.values.address2}`, alignment: "left" },
      { text: " " },
      { text: `Mobile: +91 ${form.values.mobile}`, alignment: "left" },
      { text: " " },
      { text: "Sub: Letter of Offer", alignment: "left" },
      { text: " " },
      {
        text: `Dear Mr. ${form.values.firstName} ${form.values.lastName} ,`,
        alignment: "left",
      },
      { text: " " },
      { text: "Greetings of the day.  ", alignment: "left" },
      { text: " " },
      {
        text: `Based on our recent discussions with you, we are happy to extend you an offer to join Fawr Business Solutions (hereafter referred to as 'the Company') in Coimbatore. This letter will officially confirm your annual total earning potential and terms of your employment.`,
      },
      { text: " " },
      { text: `Role: ${form.values.role}`, marginLeft: 40 },
      { text: " " },
      { text: `Career Level: ${form.values.carrerLevel}`, marginLeft: 40 },
      { text: " " },
      { text: `Grade: ${form.values.grade}`, marginLeft: 40 },
      { text: " " },
      { text: `Talent Segment: ${form.values.talentSegment}`, marginLeft: 40 },
      { text: " " },
      { text: `Business Deal: ${form.values.businessDeal}`, marginLeft: 40 },
      { text: " " },
      {
        text: `Your annual Total Gross Salary / CTC will be INR ${form.values.totalGrossSalary} + Annual Incentive and will be structured as per the attached Annexure A Compensation Details. This will continue to be applicable until further communication on the same. Your annual total earning potential includes:`,
      },
      { text: " " },
      {
        text: `i) Annual Fixed Compensation: This compensation includes all allowances and statutory benefits and will be structured in accordance with the Company's compensation guidelines.`,
        pageBreak: "after",
      },
      //next page
      {
        text: `ii) Annual Flexible Compensation: This compensation includes the incentive, increment and appraisal compensations that are subject to the overall terms and conditions of the company, including but not limited to your performance achievements and the Company's performance. The Company may, at any time and in its sole and absolute discretion, amend, suspend, withdraw vary and/or modify any of the terms and conditions of this compensation guidelines. Also this compensation will be paid out subject to
          you being on the rolls of the Company on the date of disbursement of these payouts and will be prorated based on your tenure in Fawr Business Solutions and considering the period of leave without pay during the said financial year.`,
      },
      { text: " " },
      {
        text: `iii) Retirement Benefits: This compensation includes the provident fund and gratuity of employees as per the terms and conditions of the company that are formed by following Government norms.`,
      },
      { text: " " },
      {
        text: `On joining you may undergo a training program to acquire the knowledge to enable you to successfully perform to expectations of the position for which you are being considered for employment. This offer and your employment with the Company are contingent upon you successfully completing the training program as per the satisfaction of the Company. Failing which, the Company may, in its sole discretion, elect to terminate or suspend your employment immediately.`,
      },
      { text: " " },
      {
        text: `In the event a government body/authority exercising its jurisdiction and statutory power/authority seeks information pertaining to any aspect of your employment, the Company shall provide such information to the government body/authority without any notification to you. The foregoing shall be applicable to information pertaining to your employment being shared in pursuance of statutory requirements/compliance.`,
      },
      { text: " " },
      {
        text: `You may belong to this category and your details will be disclosed to these authorities.`,
      },
      { text: " " },
      {
        text: `Your employment with the Company will be governed by the attached Annexure C Non Compete Agreement. You are required to carefully read and understand these Terms of Employment as a part of accepting this offer. As further detailed in the Terms of Employment, this offer and your employment with the Company is subject to satisfactory completion of verification and/or background or reference checks, which may occur at any time prior to or after your effective start date.`,
      },
      { text: " " },
      {
        text: `To indicate your acceptance of this offer and employment with Fawr Business Solutions, kindly submit a copy of this letter and all relevant Annexures with your signature on each page. In addition, kindly provide all the documentation identified in Annexure IV Documentation.`,
        pageBreak: "after",
      },
      //next page
      {
        text: `After acceptance of the offer of employment or any time during the course of your employment with the Company you may be required to undergo drug/alcohol/substance test based on the project, you are deployed. This offer and your employment with the Company are contingent upon you completing particular tests as per the requirements of the Company and in the instance of failing these tests namely the drug/alcohol/substance test, the Company may, in its sole discretion, elect to terminate or suspend
          your employment immediately.`,
      },
      { text: " " },
      {
        text: `This offer is contingent on us working together to determine an appropriate start date for your employment. The terms of this letter and this offer are valid for seven (7) days from the date of this letter. If we do not receive the above requested documents from you before the expiration of this period or after receiving your acceptance of this offer if you do not join the Company on a mutually agreed date of joining, or if, we are unable to set an alternative date, the terms of this letter and this
          offer will be deemed to have been rejected by you, unless otherwise communicated to you by the company in writing.`,
      },
      { text: " " },
      {
        text: `You are required to provide copies of all mandatory documents required by the Company before joining and during the course of your employment, as per the timelines specified/communicated by the Company from time to time. These documents include, but are not limited to, your education and past employment/s. The offer of employment and your employment with the Company is dependent on timely submission of such required documents. Non furnishing of mandatory document/s within the
          specified time shall result in termination of employment.`,
      },
      { text: " " },
      {
        text: `We believe you have a successful career ahead of you and look forward to your joining us.`,
      },
      { text: " " },
      { text: " " },
      { text: " " },
      {
        text: `Regards,`,
      },
      { text: " " },
      {
        text: `For ${form.values.companyName}`,
      },
      { text: " " },
      {
        text: `${form.values.position}`,
        pageBreak: "after",
      },
      //next page
      {
        text: `CONFIDENTIAL`,
        alignment: "center",
      },
      {
        text: `ANNEXURE I`,
        alignment: "center",
      },
      {
        text: `(Details about applicable laws and cash compensation as insurance policy)`,
        alignment: "center",
      },
      { text: " " },
      {
        text: `As per Indian Provident Fund (PF) regulations, membership to the Provident Fund is mandatory for all International Workers. Exemptions if any shall be as per the existing law. Kindly note that since your cost to the Company (CTC) includes employee's as well as employer's contribution to Provident Fund, appropriate adjustment in your monthly salary will be made for Provident Fund contributions as per applicable laws/regulation in existence (or amendments from time to time). Withdrawal (if any) from Provident Fund is regulated by the government of India and is subject to government approvals and prevailing laws (amended from time to time). Any person desirous of such withdrawal need to comply with applicable law and procedures laid down by the authorities.`,
      },
      { text: " " },
      {
        text: `If you are currently eligible to receive Statutory Bonus, such amounts will be calculated on an annual figure and paid (as per prevailing law) to you on a monthly basis every year. Please note that your variable pay/variable bonus is inclusive of the Stat Bonus amounts if payable to you. Such stat bonus will be accordingly adjusted against variable pay. Excess variable pay, if any, post adjustment of Stat Bonus will be paid as per Company evaluation process applicable to your career level as per company payroll cycle.`,
      },
      { text: " " },
      {
        text: `All compensation will be paid to you after deduction of tax at source, in accordance with applicable law. You will be solely liable for your personal tax liabilities, as per applicable law, both in India and abroad.`,
      },
      { text: " " },
      {
        text: `In addition to your total cash compensation, you will be eligible for following benefits, which will be governed by Company guidelines:`,
      },
      { text: " " },
      {
        ol: [
          `Effective your date of transfer Medical Insurance for self, spouse and 2 dependent children up to INR ${form.values.selfMedicalInsurance} per annum. Premium for this will be deducted from CTC.
            
            You have the option of availing Fawr Business Solutions negotiated rates to cover your parents, parents in-law and any additional child under a separate Insurance plan up to INR ${form.values.parentMedicalInsurance} per annum. The entire premium for this will have to be borne by you. This plan allows for coverage of pre-existing ailments.
  
            For Permissible claims under the Medical Insurance plans detailed above, you will be required to contribute a defined co pay, as under:`,
          {
            ul: [
              `${form.values.selfMedicalInsuranceDownPayment}% of such claims for self, spouse and 2 dependent children`,
              `${form.values.parentMedicalInsuranceDownPayment}% of such claims for parents, parents in-law and additional children under the separate Insurance plan`,
            ],
          },
          `Personal Accident coverage up to two times your annual fixed compensation`,
          `Life Insurance coverage equivalent to one time of annual fixed compensation with a minimum cover of INR ${form.values.lifeInsurance}`,
          `Gratuity as per The Payment of Gratuity Act, 1972`,
        ],
      },
      { text: " " },
      {
        text: `One time relocation allowance is subject to maximum of INR ${form.values.relocationAllowance} on submission of actual supporting as per policy. Refer to the attached relocation assistance handbook for details. In the unlikely event you choose to leave the Company or if your services are terminated for any reason whatsoever before the completion of ${form.values.relocationAllowancePenaltyTime} months of employment with the Company, the relocation allowance will be construed as debt due and should be repaid fully by you before your last working day.`,
      },
      { text: " " },
      {
        text: `The Company may, at any time and in its sole and absolute discretion, amend, suspend, vary and modify any of the terms and conditions of the above mentioned benefits.`,
      },
      { text: " " },
      {
        text: `Following the implementation to the GST regulations with effect from July 1st 2017, kindly note the treatment to any continuing obligations that you have, pursuant to any signing/joining/relocation/retention bonus as per the terms of your employment, will be as under:`,
      },
      { text: " " },
      {
        text: `Any signing, joining, relocation or retention bonus received by you will be paid along with salary of the relevant or succeeding pay month. This amount is recoverable as per your employment terms, if your service commitment with Fawr Business Solutions changes. Any such recovery or adjustment shall be made from your salary pertaining to the service month before your last working day in the Company. Any shortfalls will be adjusted against any further amounts due and payable to you.`,
        pageBreak: "after",
      },
      //next page
      {
        text: `CONFIDENTIAL`,
        alignment: "center",
      },
      {
        text: `ANNEXURE A`,
        alignment: "center",
      },
      { text: " " },
      {
        table: {
          widths: ["*", "auto", 100, "*"],
          body: [
            [
              "NAME",
              `Mr. ${form.values.firstName} ${form.values.lastName}`,
              "BAND",
              `${form.values.carrerLevel}${form.values.grade}`,
            ],
            [
              "DESIGNATION",
              `${form.values.role}`,
              "LOCATION",
              `${form.values.location}`,
            ],
          ],
        },
      },
      { text: " " },
      {
        text: `COMPENSATION DETAILS (All figures in Rs. per Annum)`,
        alignment: "center",
      },
      { text: " " },
      {
        table: {
          widths: ["*", "*"],
          body: [
            ["1. FIXED COMPONENTS", ""],
            [
              "BASIC PAY",
              { text: `${form.values.fixedBasicPay}`, alignment: "right" },
            ],
            [
              "DEARNESS ALLOWANCE (DA)",
              {
                text: `${form.values.fixedDearnessAllowance}`,
                alignment: "right",
              },
            ],
            [
              "OTHER ALLOWANCES (This is to be used towards HRA, LTA, Medical Allowance, Children’s Education Allowance, Transport Allowance and Miscellaneous Allowance)",
              {
                text: `${form.values.fixedOtherAllowance}`,
                alignment: "right",
                margin: [0, 40, 0, 40],
              },
            ],
            [
              "ESIC (It is 4% of Basic Pay)",
              { text: `${form.values.fixedESIC}`, alignment: "right" },
            ],
            [
              "BONUS / EX-GRATIA (Bonus will be 10% of (Basic + DA) and paid in one time basis during the financial year)",
              { text: `${form.values.fixedBonus}`, alignment: "right" },
            ],
            [
              { text: "ANNUAL FIXED PAY", alignment: "right" },
              { text: `${form.values.annualFixedPay}`, alignment: "right" },
            ],
          ],
        },
      },
      { text: " " },
      {
        table: {
          widths: ["*", "*"],
          body: [
            ["2. FLEXIBLE COMPONENTS ( Based On Performance )", ""],
            [
              "INCREMENT - Paid in early twice",
              { text: `${form.values.flexibleIncrement}`, alignment: "right" },
            ],
            [
              "INCENTIVE - 5% of annual financial year target and paid in monthly basis",
              { text: `${form.values.flexibleIncentive}`, alignment: "right" },
            ],
            [
              "APPRAISAL - paid in Quarterly basis",
              { text: `${form.values.flexibleAppraisal}`, alignment: "right" },
            ],
            [
              "Bonus - 5% of annual contribution on sales",
              { text: `${form.values.flexibleBonus}`, alignment: "right" },
            ],
            [
              { text: "ANNUAL FLEXIBLE PAY", alignment: "right" },
              { text: `${form.values.annualFlexiblePay}`, alignment: "right" },
            ],
          ],
        },
      },
      { text: " " },
      {
        table: {
          widths: ["*", "*"],
          body: [
            ["3. RETIREMENT BENEFITS", ""],
            [
              "PROVIDENT FUND - 12% of (Basic Pay)",
              {
                text: `${form.values.retirementProvidentFund}`,
                alignment: "right",
              },
            ],
            [
              "GRATUITY - 4.81% of (Basic + DA)",
              { text: `${form.values.retirementGratuity}`, alignment: "right" },
            ],
            [
              { text: "ANNUAL RETIREMENT BENEFITS", alignment: "right" },
              {
                text: `${form.values.annualRetirementBenefits}`,
                alignment: "right",
              },
            ],
            [
              {
                text: "ANNUAL TOTAL GROSS SALARY (TGS) / CTC (1+2+3)",
                alignment: "right",
              },
              { text: `${form.values.totalGrossSalary}`, alignment: "right" },
            ],
          ],
        },
      },
      {
        text: "All the above benefits are as per Company’s policies, which are subject to change from time to time.",
        pageBreak: "after",
      },
      //next page
      {
        text: `OTHER BENEFITS`,
        alignment: "center",
      },
      { text: " " },
      {
        text: `As per Government norms, the company employees who have completed three years of service are eligible for salary loan which has to be approved by their Team Leader / Manager. The disbursement of any loan / loan allowance is subject to the fulfillment of all criteria defined for the same to the satisfaction of the Company as per the relevant loan policy at that time.`,
        pageBreak: "after",
      },
      { text: " " },
      {
        text: `CONFIDENTIAL`,
        alignment: "center",
      },
      { text: " " },
      {
        text: `Explanation of Compensation Descriptions`,
        alignment: "center",
      },
      { text: " " },
      {
        table: {
          widths: ["*", "*"],
          body: [
            ["Component", "Summary Explanation *"],
            [
              "1. Fixed Compensation Components",
              "These compensations are paid to employees irrespective of their performance.",
            ],
            [
              { text: "(i) Basic Salary", marginLeft: 20 },
              "The fundamental salary component to which many other compensation components are linked.",
            ],
            [
              { text: "(ii) Dearness Allowance (DA)", marginLeft: 20 },
              "It is a payment towards the rise in cost of living, which is calculated based on cost of living index.",
            ],
            [
              { text: "(iii) Other Allowances", marginLeft: 20 },
              "This is valued at 70% of your annual Basic Salary and is to be used towards HRA, LTA, Medical Allowance, Children’s Education Allowance, Transport Allowance and Miscellaneous Allowance. For certain elements, employees may avail of tax exemptions as per prevailing tax laws. The elements are listed below.",
            ],
            [
              { text: "(a) Leave Travel Allowance (LTA)", marginLeft: 40 },
              "LTA can be used for up to maximum of economy class airfare twice during a 4 year period as per Income tax rules.",
            ],
            [
              {
                text: "(b) Fuel & Maintenance expenses reimbursement",
                marginLeft: 40,
              },
              "Maximum INR 36,000/- per annum to be reimbursed against actual receipts for Fuel and Vehicle maintenance expenses as defined in Fawr Business Solutions India FBP Policy. Income tax/perquisite tax calculations are governed as per the Income Tax Act and subject to changes as applicable.",
            ],
            [
              { text: "(c) House Rent Allowance", marginLeft: 40 },
              "Maximum 20% of Basic Salary per annum. To be used for house rent.",
            ],
            [
              { text: "(d) Company Leased Car (CLC)", marginLeft: 40 },
              "Money can be allocated from FBP.",
            ],
            [
              { text: "(e) “Flat” Allowance", marginLeft: 40 },
              "Remaining FBP funds and is a taxable amount.",
            ],
            [
              { text: "(iv) ESIC", marginLeft: 20 },
              "Until your monthly wages are up to INR 21,000/- per month, or such other amount prescribed by law, you will be covered under Employee State Insurance Act, 1948 (ESIC) and will be entitled to avail benefits under the same. It is of 4% of (Basic Salary + Dearness Allowance).",
            ],
          ],
        },
        pageBreak: "after",
      },
      //next page
      {
        table: {
          widths: ["*", "*"],
          body: [
            [
              "",
              "The company invests 3.25% and the remaining 0.75% of investment will be deducted from monthly salary of employees.",
            ],
            [
              "2. Flexible Compensation components",
              "These components are based on the performance of employees and are subject to the company terms and conditions.",
            ],
            [
              { text: "(i) Increment", marginLeft: 20 },
              "The salary increment will be 5 to 7% of TGS and paid in early twice during the financial year.",
            ],
            [
              { text: "(ii) Incentive", marginLeft: 20 },
              "The Incentive will be 5 to 7% of annual financial target of employees and paid in monthly basis during the financial year. In general, employees in Marketing Department receive incentives.",
            ],
            [
              { text: "(iii) Appraisal", marginLeft: 20 },
              "The appraisal will be 5% of TGS and eligible to better performed employees and paid in quarterly basis during the financial year.",
            ],
            [
              "3. Retirement Benefits",
              "These elements of compensation are not paid out until later when certain conditions are met.",
            ],
            [
              { text: "(a) Provident Fund (PF)", marginLeft: 20 },
              "12% of Basic Salary is contributed to the Provident Fund as per Government norms.",
            ],
            [
              { text: "(b) Gratuity", marginLeft: 20 },
              "4.81% of (Basic Salary + Dearness Allowance), which denotes the company's contribution to the Gratuity Fund based on actuarial calculations. You are not entitled to this amount as a cash component as this is intended to be a retirement benefit. Gratuity is payable to you as per the Fawr Business Solutions Gratuity Trust Fund Rules and the Payment of Gratuity Act, 1972, on cessation of your employment after at least 5 years of continuous service with the Company. The amount of gratuity payable shall not exceed Twenty Lakhs rupees (INR 20,00,000).",
            ],
            [
              "Annual Total Gross Salary / CTC",
              "Annual Fixed Compensation + Annual Flexible Compensation + Retirement Benefits",
            ],
          ],
        },
      },
      { text: " " },
      {
        text: `* For detailed information, kindly refer to Company policies which are subject to change from time to time.`,
        pageBreak: "after",
      },
      //next page
      {
        text: `ANNEXURE III`,
        alignment: "center",
      },
      { text: " " },
      {
        text: `(Self Declaration form)`,
        alignment: "center",
      },
      { text: " " },
      {
        text: "I hereby represent and warrant that as of my effective start date of employment with Fawr Business Solutions (here after referred to as 'the Company'), I will have: (a) terminated my employment with any current/previous employer and any other employment or contractor relationships; and (b) satisfactorily performed and completed all my obligations which apply/applied to me via any current/previous employer and any other employment or contractor relationships.",
      },
      { text: " " },
      {
        text: "I hereby represent and warrant that I have not, during the course of any current/previous employer and any other employment or contractor relationships, entered into or agreed to any arrangement which may restrict, prohibit or debar or conflict, or be inconsistent with my acceptance of the offer made by the Company or employment with the Company, including, but not limited to, any time-bound non-compete agreement, restrictive employment agreement or other restrictive terms.",
      },
      { text: " " },
      {
        text: "I hereby represent and warrant that I shall not bring into the Company premises (or use in any manner) any third party documents (regardless of media) or materials (including but not limited to trade secrets) with myself to the Company, including any such documents or materials from my previous employer. To the extent I feel that my employment at the Company would require me to bring any third party documents or materials to the Company. I shall not bring any such documents or materials unless I have taken all permissions/approvals from the third parties before accepting the offer from the Company. I further represent and warrant that I have not and will not inappropriately disclose or misuse any confidential information obtained from and/or in connection with any current/previous employer and any other employment or contractor relationships. I agree and acknowledge that a breach of this provision shall entitle the Company to terminate my services with immediate effect.",
      },
      { text: " " },
      { text: " " },
      {
        text: "ACKNOWLEDGED AND AGREED",
      },
      { text: " " },
      {
        text: "____________________________",
      },
      { text: "" },
      {
        text: "[Full legal name]",
      },
      { text: " " },
      {
        text: "Date:",
        pageBreak: "after",
      },
      //next page
      {
        text: `ANNEXURE IV`,
        alignment: "center",
      },
      { text: " " },
      {
        text: `(Supporting Documents for On-boarding)`,
        alignment: "center",
      },
      { text: " " },
      {
        text: "During On-boarding, you are required to have all the documents as mentioned below, uploaded and approved in the Fawr B Sol e-doc submit application 15 days prior to the due date of confirmation. If you do not complete the e-doc submission on or before this date, then the confirmation would be postponed by three months from the initial due date of confirmation and you would be confirmed on the 1st day of the subsequent month only. The period of probation can be extended by 3 months per instance of non - completion for up to four times (up to a maximum of one year).",
      },
      { text: " " },
      { text: " " },
      {
        text: "Copies of the following will constitute the required documents:",
      },
      {
        ul: [
          "Class 10 (or equivalent) Marks Sheet (s)",
          "Class 12 (or equivalent) Marks Sheet (s)",
          "Under Graduation Marks Sheet (s) & Degree completion Certificate (both mandatory)",
          "Post Graduation Marks Sheet (s) (if applicable)",
          "Post Graduation Degree Certificate (if applicable)",
          "Diploma Certificate (if applicable)",
          "Prior Experience/ Relieving Certificate (s) (if applicable)",
          "Passport",
          "Aadhar Card (For Address proof)",
          "PAN Card (As per Income Tax rules, the disclosure of your Permanent Account Number (PAN) to Fawr Business Solutions is mandatory. So, kindly disclose your PAN to company on or 30 days before the day of joining and note that disclosure of PAN is a pre-condition for your confirmation into the system)",
          "Bank passbook front page image stating the bank account details for processing salary",
          "Passport size photograph",
          "National Skills Registry (Employees are required to sign the document at the time of joining and the upload of the same will done by the On-boarding team)",
          "Past 3 years employment details to be filed in application (only for experienced/lateral entry candidates)",
          "Letter Of authorization (self-declaration that not involved in any criminal activities and subject to convicted crime by any Police, Judicial)",
          "Other Support Documents for Back Ground Check.",
        ],
        pageBreak: "after",
      },
      //next page
      {
        text: `ANNEXURE V`,
        alignment: "center",
      },
      { text: " " },
      {
        text: `(Information about Earned Leave)`,
        alignment: "center",
      },
      { text: " " },
      {
        text: "There would be only one type of leave, which is Earned Leave. During the 1st and 2nd year (including probationary period as well as) of service, you would be eligible for 15 working days of leave per annum. The leave eligibility shall begin in the respective quarter of your joining the Company.",
      },
      { text: " " },
      {
        text: "For example: If an employee joins the Company in quarter three of the financial year 2010 - 2011, his / her leave eligibility would start in quarter three of the financial year 2010 - 2011. For the purpose of leave credit quarter three of the financial year 2010 - 2011 will be considered as the first quarter. Please note that leave shall be credited on a pro-rated basis in the first quarter of the employee’s employment. On completion of 2 years in service, you shall be eligible for 20 working days leave per annum which would be credited to the employee on a quarterly basis. You would be eligible for the additional leave from the 3rd year onwards from the quarter succeeding the quarter in which you would be completing 2 years with the Company from the date of joining.",
      },
      { text: " " },
      {
        text: "The table below is indicative or based on the assumption that the employee joins on the first day of a quarter.",
      },
      { text: " " },
      { text: " " },
      {
        table: {
          widths: ["auto", "*", "*", "*", "*", "*"],
          body: [
            [
              { text: "Year / Quarter", alignment: "center" },
              { text: "Quarter 1", alignment: "center" },
              { text: "Quarter 2", alignment: "center" },
              { text: "Quarter 3", alignment: "center" },
              { text: "Quarter 4", alignment: "center" },
              { text: "Total", alignment: "center" },
            ],
            [
              { text: "During probationary period", alignment: "center" },
              { text: "4", alignment: "center" },
              { text: "4", alignment: "center" },
              { text: "4", alignment: "center" },
              { text: "3", alignment: "center" },
              { text: "15", alignment: "center" },
            ],
            [
              { text: "1st & 2nd year of service", alignment: "center" },
              { text: "4", alignment: "center" },
              { text: "4", alignment: "center" },
              { text: "4", alignment: "center" },
              { text: "3", alignment: "center" },
              { text: "15", alignment: "center" },
            ],
            [
              { text: "3rd year onwards", alignment: "center" },
              { text: "5", alignment: "center" },
              { text: "5", alignment: "center" },
              { text: "5", alignment: "center" },
              { text: "5", alignment: "center" },
              { text: "20", alignment: "center" },
            ],
          ],
        },
        pageBreak: "after",
      },
      //next page
      {
        text: `ANNEXURE VI`,
        alignment: "center",
      },
      { text: " " },
      {
        text: `(General Terms and Conditions)`,
        alignment: "center",
      },
      { text: " " },
      {
        ul: [
          "Your employment with the Company is at all times subject to you having a valid work permit from the Government of India. It is your responsibility to obtain and maintain throughout your employment a valid work permit. A copy of the work permit needs to be furnished by you on the date of on boarding, failing which you will not be permitted to join.",
          "Your initial posting will be in Coimbatore, However, your services are transferable and you may be assigned to any other department, location or office of Fawr Business Solutions, a subsidiary, or associate company as the Company may decide from time to time. Your project, designation or role may be changed at the discretion of the Company depending on the work assigned to you. In such case, you will be governed by the policies of that location and role.",
          "You acknowledge that the technology industry undergoes rapid transformations and structural changes. In this context, the company frequently enters into agreements with other entities, including outsourcing arrangements, transitions, mergers, acquisitions, divestitures and other corporate actions.",
          "If any such action relates to your role / position, you agree to cooperate with Fawr Business Solutions and take any necessary steps to ensure a smooth transition.",
          "Your appointment and continued employment at Fawr Business Solutions is conditional upon satisfactory reference & background checks including verification of your application materials, education and employment history. Your employment is also contingent upon your ability to work for the Company without restriction (i.e. you do not have any non-compete obligations or other restrictive clauses with any previous employer). If any information furnished by you in your application for employment or during the selection process is found at any time during your employment to be incorrect or false, and/or if you have suppressed material information regarding your qualifications and experience, the Company may terminate your services without notice or compensation.",
          "Your designation may be changed at the discretion of the Company depending on the work assigned to you.",
          "You may be required to travel on Company work and you will be reimbursed expenses as per Company policy.",
          "If you are absent for a continuous period of 8 days without leave or obtaining your manager’s approval, you will be deemed to have voluntarily terminated your service without notice.",
          "You will be on probation until your successful completion of the probationary period is confirmed in writing. The normal probation period is 6 months but may be extended or confirmed earlier based on your performance and at your manager’s discretion. At any time during your probationary period, either you or the Company may terminate your service by giving 30 days notice or basic salary in lieu thereof.",
          "Upon completion of your probation period and confirmation as a regular employee, you or the Company may terminate your service at any time by giving 90 days notice or basic salary in lieu thereof. However due to exigencies of business the Company may at its sole discretion reject the salary in lieu of notice and ask you to serve the entire or part of the notice period. You shall not be deemed to have been relieved of your services except upon issue of a letter by the Company to that effect.",
          "Fawr Business Solutions encourages and fosters a culture of strong performance from its employees. Accordingly, during your service with the company, you will be required to comply with the following:",
          {
            ul: [
              "The Company presents multiple opportunities across technologies to support employees develop their skills and build their career. You shall maintain a satisfactory level of performance at all times.",
              "You agree to utilize company’s resources, materials and training programs as applicable, and shall ensure that your skills are at all times current and relevant to company’s business.",
              "You may be required to undergo certain training and assessment programs from time to time and shall complete the same to the satisfaction of the company.",
              "You also understand and acknowledge that Fawr Business Solutions requires its employees to be productively and effectively utilized at all times. Fawr Business Solutions maintains listings of open positions on its internal job postings page. If you are no longer deployed on a project/ assignment, you shall search for positions that are commensurate with your skills and experience and ensure you are effectively utilized. If selected for such positions, your movement to these positions will be subject to company’s processes and policies.",
              "You will be aware that the Company works on a round the clock model depending on customer needs. You hereby consent, should your role require it, to working on any shift, including night shift, to support the business requirements of the Company.",
              "Your compliance with the above terms and conditions shall be reviewed from time to time, and shall be an integral condition of your continued employment with Fawr Business Solutions.",
            ],
          },
          "You will retire from the services of the Company on attaining 56 years. Retirement action will be performed one day prior to the last working day of the retiring month.",
          "Upon your resignation or retirement from the Company or termination of your services, you are required to return all assets and property of the Company such as documents, machines, data, files and books etc. (including but not limited to leased properties).",
          "Any and all of the terms and conditions of service may be modified or changed at the Company’s discretion.",
          "Your individual remuneration is strictly confidential and is detailed in Annexure A. It has been determined based on numerous factors such as your job, skills-specific background, and professional merit. This information and any changes made therein should be treated as personal, confidential and should not be disclosed to any person without company’s prior written authorization.",
          "You will, by default, be enrolled in company’s Group Mediclaim Insurance Policy, unless you choose to opt out. A nominal premium will be charged to you for the same, for as long as you participate in the Policy. All benefits as outlined herein and in company policies are subject to change at the Company’s discretion. You will be entitled to privilege leave in accordance with the Company’s policy as applicable from time to time.",
          "It is your responsibility to notify the Company of any changes in your personal information within 3 working days. All notices shall be considered duly and properly delivered to the address on file with the Company.",
          "All employees are required to read and comply with company’s Business Conduct Guidelines and sign a statement to this effect. Any breach of the Guidelines or the terms and conditions of employment may result in termination of your services without notice or compensation.",
          "During your service with the Company, you are expected to devote your whole time and attention to the Company's affairs and refrain from directly or indirectly engaging in any other employment or business in any role or capacity.",
          "Information pertaining to Fawr Business Solutions operations and intellectual property is confidential as detailed in Annexure B. You will also be bound by more specific non-disclosure agreements on sensitive issues based on business requirements. If you are bound by a confidentiality agreement with a previous employer, you must notify the Company and indemnify the Company against any breach thereof.",
          "You hereby agree to abide by all the rules and regulations of the Company and accept the policies and processes of the Company which are in force from time to time and the Company shall have the right to vary or modify any or all of the rules, regulations or policies and the same shall be binding on you.",
          "This offer is conditional upon your having a valid Passport. If you do not have a passport as of the date of this offer, you are required to apply for one immediately and produce the relevant acknowledgement on the day of your on boarding. Should you be denied a passport or if you are otherwise unable to produce a copy of your passport, Fawr Business Solutions shall be entitled to terminate your employment for cause. It is a condition of your employment that you have a valid passport at all times.",
          "You will be required to provide the Aadhaar Number on the day of on-boarding and the same must be updated on the HR Systems mandatorily within 30 days of your on-boarding. Kindly do ensure that the name as per Aadhaar is exactly the same as the name given by you to the company, and that appears on this employment contract. In case there is a mismatch please have the same rectified with Aadhaar authority (UIDAI) prior to onboarding.",
          "You will be required to register your profile with National Skills Registry once you join Fawr Business Solutions. The details on the National Skills Registry are available on www.nationalskillsregistry.com. To complete the registration process, you will be required to submit a photograph, a photo identity proof and registration fee of INR 400 + (Service taxes as applicable) - which includes INR 50/- annual usage fee at the POS (Point of Service) helpdesk at Fawr Business Solutions office Registration with National Skills Registry is mandatory and should be completed within 30 days from your date of joining.",
        ],
        pageBreak: "after",
      },
      //next page
      {
        text: "Sign On Bonus",
      },
      { text: "" },
      {
        text: 'You are entitled to a Sign-on Bonus ("Bonus") as set forth in the compensation breakup given herewith. The Bonus amount may be paid in one time lump-sum payout or in installments, and will be paid to you upon joining the Company. The payment timeline is subject to the date of joining and the company payment cut-off date. For example: if your date of joining is between 1st to 15th of the month then the payment will be processed in the same month of joining else it will be processed in the subsequent month of joining. This payment is conditional upon your being employed with the Company for a minimum period of one year from the date of your joining, unless a longer duration is specified in OTHER COMMITMENTS/CONDITIONS section.',
      },
      { text: "" },
      {
        text: "In the event of your separation or termination (employee initiated terminations and BCG violation terminations) from the company prior to the completion of one year or the period specified in OTHER COMMITMENTS/CONDITIONS section from the date of joining (whichever is later) for any reason whatsoever, you agree that you shall return the entire Bonus to the company, inclusive of the tax deducted. The company shall also be entitled to take the Bonus into account for reconciling any amounts due to you from the Company. Any such deduction from amounts owing to you by the company upon separation/termination as aforesaid shall not affect the Company’s rights in law or equity in respect of the amounts of unrecovered Bonus, if any. The Bonus shall be subject to all statutory deductions. All applicable taxes in respect of the Bonus shall be to your account.",
      },
      { text: "" },
      {
        text: "Growth Driven Profit-sharing (GDP), an annual profit distribution scheme, is another important part of your compensation opportunity and is designed to support a team oriented, high-performance work culture.",
      },
      { text: "" },
      {
        text: "Further details of the program will be made available to you upon joining Fawr Business Solutions. Kindly note: Fawr Business Solutions reserves the rights, in its sole discretion, to amend, change, suspend, or terminate the Growth Driven Profit-sharing program at any time, including, but not limited to, changing how the profit sharing pool is allocated or altering the payment amount at the region or country level based on unanticipated business issues or extenuating circumstances.",
      },
      { text: "" },
      {
        text: "The Company presently has a Individual Performance Award Program (IPAP). Further details of the Performance Award Program will be made available to you upon joining Fawr Business Solutions. Kindly note: Fawr Business Solutions reserves the right in its sole discretion to amend, change, suspend, or terminate Performance Award Program at any time.",
      },
      { text: "" },
      {
        text: "You agree to the Company adjusting the statutory bonus amount, if any, under the Payment of Bonus Act, 1965, against payments made under the Company’s profit distribution schemes GDP & IPAP.",
      },
      { text: "" },
      {
        text: "OTHER COMMITMENTS/ CONDITIONS",
      },
      { text: "" },
      {
        text: "Notice period buyout on Actuals",
        marginLeft: 20,
      },
      { text: "" },
      {
        text: "Sign-on Bonus will be 10% of annual CTC of employees as per the terms mentioned above.",
        pageBreak: "after",
      },
      //next page
      {
        text: `CONFIDENTIAL`,
        alignment: "center",
      },
      { text: " " },
      {
        text: `Other Benefits– Additional Information*`,
        alignment: "center",
      },
      { text: " " },
      {
        text: "Group Term Life and Accident Rider Coverage Scheme",
      },
      { text: " " },
      {
        text: "Group Term Life Insurance Plan:",
      },
      {
        text: "This is a company paid benefit which provides group term life coverage to all employees of Fawr Business Solutions. The benefit basis for life coverage is sixty times monthly basic salary subject to a minimum and a maximum coverage as stated in the policy. The coverage is subject to completion of the Insurance Company’s prescribed insurance underwriting procedure and awarding of coverage by the insurance company. Coverage applies world-wide, 24 hours a day.",
      },
      { text: " " },
      {
        text: "Group Personal Accident Plan:",
      },
      {
        text: "This is a company paid benefit which provides group personal accident coverage to all employees Fawr Business Solutions. The benefit basis for accident coverage against permanent total disability, permanent partial disability and dismemberment is sixty times monthly basic salary subject to a minimum and a maximum coverage as stated in the policy. Coverage applies world-wide, 24 hours a day.",
      },
      { text: " " },
      {
        text: "Group Mediclaim Insurance Policy for Self and nuclear family (spouse and up to 4 children)",
      },
      {
        text: "By default, you will be enrolled in the Group Mediclaim Policy from the date of your joining with a coverage of up to INR 3 Lakh per year under Family Floater plan. As part of that, you can also enroll your immediate family (Spouse & up to Four Children) through our Third-Party Administrator’s (TPA) website within 90 days of your joining. If you decide to avail Mediclaim insurance policy, there will be an applicable Co-share of premium deduction from your salary. If you wish not to be covered, you may choose to opt out within 90 days of joining. You have the option of enhancing this cover up to a maximum of INR 5 Lakh per year (incremental premium to be borne by employee).",
      },
      { text: " " },
      {
        text: "You also have the opportunity of purchasing insurance coverage for your parents. This is on an individual coverage basis and the premium incurred is to be borne by you.",
      },
      { text: " " },
      {
        text: "Mid-term inclusion of only new born babies (within 45 days of the child birth) and newly married spouse (within 45 days from the date of marriage) is allowed. The insurance coverage for the newly acquired dependent (spouse/child) will be with effect from the date of event (marriage/ birth whichever is applicable) *",
      },
      {
        text: "*Subject to enrolling the new dependent within 45 days from the date of event.",
      },
      { text: " " },
      {
        text: "All hospitalization claims under the Medical Insurance Policy pertaining to employee is borne by insurer at 90% : 10%. Claims pertaining to dependents (spouse, children and parents) will be borne by insurer and employee on a 80% : 20% basis.",
      },
      { text: " " },
      {
        text: "Critical Illness Buffer",
      },
      {
        text: 'This benefit is provided to help you and your nuclear family in times of medical emergencies. If an employee, spouse or child is diagnosed with any of the illnesses defined under the "Critical Illness Buffer" criteria, you can also be eligible for an additional amount of INR 3 Lakhs for required treatment once the Family Floater and any additional cover (if taken) is exhausted. This is subject to available Corporate Buffer and policy T&C.',
      },
      { text: " " },
      {
        text: "Domiciliary Benefit",
      },
      {
        text: "Domiciliary expenses on out-patient care for employee, spouse and children up to a maximum of INR 10,000/- (at 20% Co-pay) is also provided to employees who participate in the Group Mediclaim Insurance Policy.",
      },
      { text: " " },
      {
        text: "Compensation under Employees Compensation Act",
      },
      {
        text: "All Fawr Business Solutions employees are entitled for compensation under the Employee's Compensation Act, 1923, as amended from time to time. The compensation under the Act will be inclusive of the coverage amount under Group term Life Insurance Plan and shall be paid under following circumstances:",
      },
      {
        text: "a) In case of personal injury caused to an employee by an accident arising out of and in the course of his employment resulting in total or partial disablement of the employee for a period exceeding three days. Provided that the accident is not directly attributable to the employee having being under the influence of drink or drugs or willfully disobedience of any order expressively given for the safety of employees or willfully removal or disregard of any safety guard or other device provided for the purpose of securing safety of employees.",
      },
      {
        text: "b) In case of any injury resulting in Death or permanent total disability.",
      },
      {
        text: "c) In case of occupational disease as defined under the Act.",
      },
      { text: " " },
      {
        text: "* For detailed information, kindly refer the Company's policy. Company benefits and policies are subject to withdrawal; change from time to time at the sole discretion of the Company and without the need of any prior notice to the employees.",
        pageBreak: "after",
      },
      //next page
      {
        text: `CONFIDENTIAL`,
        alignment: "center",
      },
      { text: " " },
      {
        text: `ANNEXURE B - NON-DISCLOSURE AGREEMENT`,
        alignment: "center",
      },
      { text: " " },
      {
        text: `(Agreement Regarding Confidential Information, Intellectual Property, and Other Matters)`,
        alignment: "center",
      },
      { text: " " },
      {
        columns: [
          {
            text: "Serial # :________________",
            alignment: "left",
          },
          {
            text: "Date Of Hire : __ __ / __ __ / __ __ __ __",
            alignment: "right",
          },
        ],
      },
      { text: " " },
      {
        text: "In consideration of my employment or my continued employment by Fawr Business Solutions or one of its subsidiaries or affiliates (collectively, “Fawr B Sol”), which I acknowledge is employment at will, and the payment to me of a salary or other compensation during my employment, I agree as follows:",
      },
      { text: " " },
      {
        text: "1. I will not, without FAWR B SOL's prior written permission, disclose to anyone outside of FAWR B SOL or use in other than FAWR B SOL's business, either during or after my employment, any confidential information or material of FAWR B SOL, or any information or material received by FAWR B SOL in confidence from third parties, such as suppliers or customers. If I leave the employ of FAWR B SOL or at the request of FAWR B SOL, I will return to FAWR B SOL all property in my possession belonging to FAWR B SOL or received by FAWR B SOL from any third party, whether or not containing confidential information and whether stored on an FAWR B SOL owned asset or a personally owned asset, including, but not limited to, electronic data, electronic files, diskettes and other storage media, drawings, notebooks, reports, and any other hard copy or electronic documents or records. No employee is prohibited from reporting possible violations of law or regulation to a government agency, as protected by law.",
      },
      { text: " " },
      {
        text: 'Confidential information or material of FAWR B SOL is any information or material: (a) generated or collected by or utilized in the operations of FAWR B SOL; received from any third party; obtained from an entity FAWR B SOL acquired or in which FAWR B SOL purchased a controlling interest (including information or material received by that entity from a third party); or suggested by or resulting from any task assigned to me or work performed by me for or on behalf of FAWR B SOL; and (b) which has not been made available generally to the public, whether or not expressed in a document or other medium and whether or not marked "FAWR B SOL Confidential" or with any similar legend of FAWR B SOL or any third party. Confidential information or material may include, but is not limited to, information and material related to past, present and future development, manufacturing activities, or personnel matters; marketing and business plans; pricing information; customer lists; technical specifications, drawings, and designs; prototypes; computer programs; and databases.',
      },
      { text: " " },
      {
        text: "2. (a) During my employment with FAWR B SOL and for two years following the termination of my employment from FAWR B SOL for any reason, I will not directly or indirectly within the Restricted Area solicit, or attempt to or participate or assist in any effort to solicit, any employee of FAWR B SOL to be",
      },

      // { text: `Name: ${form.values.firstName} ${form.values.lastName}`, style: 'name' },
      // { text: `Role: ${form.values.role}`, style: 'role' },
      // { text: `Description: ${form.values.description}`, style: 'description' },
      // { qr: `Name: ${form.values.firstName} ${form.values.lastName} Role: ${form.values.role} Description: ${form.values.description}`, fit: 200, },
    ],
    styles: {
      name: {
        fontSize: 18,
        bold: true,
        margin: [0, 20, 0, 10],
      },
      role: {
        fontSize: 18,
        margin: [0, 0, 0, 10],
      },
    },
  };

  const internDocDefinition = {
    pageSize: "A4",
    pageOrientation: "portrait",
    pageMargins: [40, 60, 40, 60],
    footer: {
      columns: [
        {
          text: "Ref: FAWR/InOffer/-v.2/20210803CBHRE0071",
          alignment: "left",
          fontSize: 8,
        },
        {
          text: "...................................................",
          alignment: "right",
          fontSize: 8,
        },
      ],
      margin: [40, 0, 40, 40],
    },
    content: [
      { text: `${new Date().toDateString()}`, alignment: "right" },
      { text: "PROVISIONAL INTERNSHIP OFFER", alignment: "center" },
      { text: " " },
      { text: " " },
      {
        text: `Dear ${form.values.firstName} ${form.values.lastName} ,`,
        alignment: "left",
      },
      { text: " " },
      {
        text: `On behalf ${form.values.companyName} called as Fawr Bsol, I am excited to extend an offer to you for an internship position within our ${form.values.position}. This Intern position as ${form.values.role} is located in [${form.values.location}] Work from Home as Covid Precaution.`,
      },
      { text: " " },
      {
        text: `This position is scheduled for 90 days will be a Three -month internship opportunity. The schedule for this position is Monday to Saturday 6 hours/day Shift basis. This position includes organization mail/number, Internship certificate, total Stipend INR 30000/- Twenty Thousand Rupees only and incentives based on performance ( refer Annexure A )will be provided at the end of internship & recommendation Letter.`,
      },
      { text: " " },
      {
        text: `In this role, you will report directly to Business manager. This offer is contingent upon the successful completion of ${form.values.role}. Please be sure to bring/submit [Educational documents] with you on your first day to completeyour profile.`,
      },
      { text: " " },
      {
        ul: [
          `Bonafide Certificate`,
          `No Objection Certificate from Institution`,
          `Undertaking Letter from Placement Officer / DEAN / HOD`,
        ],
      },
      { text: " " },
      {
        text: `Above mentioned documents are mandatory to take part in this Student Learning Programme`,
      },
      { text: " " },
      {
        text: `During your temporary employment with Fawr Bsol you may have access to trade secrets and confidential or proprietary business information belonging to Fawr Bsol. By accepting this offer, you acknowledge that this information must remain confidential and agree to refrain from using it for your own purposes or disclosing it to anyone outside of Fawr Bsol. In addition, you agree that upon completion of your internship, you will promptly return any company-issued property and equipment along with information and documents belonging to the company. By accepting this offer, you acknowledge that you understand participation in this program is not an offer of employment, and successful completion of the program does not entitle you to an employment offer from Fawr Bsol.`,
      },
      { text: " " },
      { text: " " },
      {
        text: `This offer letter represents the full extent of the internship offer and supersedes any prior conversations about the position. Changes to this agreement may only be made in writing. If you have any questions about this offer please mail to Internship@fawrtech.com in our recruiting department. Please review this letter in full, and sign and return it via mail to onboarding@fawrtech.com to confirm your acceptance of the position no later than close of business on 30th December 2022. We look forward to having you begin your career at Fawr Bsol and wish you a successful internship. Welcome to our team!`,
        pageBreak: "after",
      },
      //next page
      {
        text: `Your role will commence on 2nd - January -23 subject to your acceptance of this Offer and the Terms and Conditions of Employment on/before the joining Date. Please sign and email a copy of this letter to support@fawrtech.com The Terms and Conditions of your employment are included below as Annexure-A.`,
      },
      { text: " " },
      { text: " " },
      {
        text: `If you have any queries regarding this Offer Letter, or the Terms and Conditions of Employment, please contact your recruiter and/or email to candidate.response@fawrtech.com We hope that you will be a great asset to our team, and we look forward to having a positive employment relationship.`,
      },
      { text: " " },
      { text: " " },
      { text: `Sincerely,` },
      { text: " " },
      { text: `Senior Talent Acquisition Manager` },
      { text: `Fawr Business Solutions,`, pageBreak: "after" },
      //next page
      {
        text: `Role Responsibilities:`,
      },
      { text: " " },
      {
        ul: [
          `Manage engagements in areas of digital strategy, eco platform, cognitive enterprise and large scale business transformation`,
          `Understand company s key strategic/operational issues (full stake development definition, industry trends, client issues)`,
          `Structure and create assessments and identify appropriate tools and systems to be used and analyses to be done`,
          `Conduct assessment to identify key issues and set of hypotheses to analyse and address those issues with right solutions`,
          `Data analysis to confirm hypothesis and present solutions backed by data`,
          `Research industry-related topics`,
          `Prepare well-structured drafts using digital publishing platforms`,
          `Conceptualize and develop web page engaging content (text, video, and images) for company websites, blogs, marketing materials, and similar platforms`,
          `Mine existing clients for additional business opportunities and drive aggressive sales efforts`,
          `Ensure project economics by managing invoicing, collections and managing project expenses with the team`,
        ],
      },
      { text: " " },
      {
        text: `Required Technical and Professional Knowledge`,
      },
      { text: " " },
      {
        ul: [
          `Delivered engagements in the areas of Platform Eco Strategy, Shared Services, Technology Strategy,Digital Reinvention Very strong Computer Science fundamentals Strong knowledge of Linux, PHP/Go/Java/Ruby/Python, and MySQL, with a working understanding of MongoDB, AngularJS, Express.js, React, and Node.js. Fluent in CSS (Foundation or Bootstrap), JavaScript, and HTML, with an understanding of CSS pre-processors including Sass and LESS.`,
          `Experience in API design and development.`,
          `Understanding of libraries including Backbone.js, jQuery, Ajax. Dynamic programming. Strong knowledge of data structures, system design, and algorithms.`,
          `Understanding of micro services and distributed systems Excellent written and verbal communication skills, with strong attention to detail and a head for problem-solving Skilled at working in tandem with a team, or unsupervised as required.`,
          `Team-player, flexible and able to work in a fast-paced environment`,
          `Experience in working with C level executive clients`,
          `Excellent communication and interpersonal skills`,
          `Strong presentation development and Customer Presentation skills`,
          `Strong facilitation skills to tailor delivery with Full stakedevelopment`,
          `Willingness to travel and flexible to adopt to a demanding lifestyle`,
          `To perform this job successfully, the person must be able to perform each essential duty satisfactorily. The requirements listed below are representative of the knowledge, skills and abilities required.`,
          `Strong business acumen with solid understanding of the business environment`,
          `Ability to clearly understand the business objectives and Fawr Operations performance drivers`,
          `Good communication skills, must be comfortable communicating with senior level management`,
          `Strong critical thinking and problem solving skills`,
          `Ability to work under pressure, meet tight deadlines, multi-task and prioritize various deliverables`,
          `Excellent interpersonal skills: credible, consistent and active listening, confident and fully cognizant of ones strengths`,
        ],
      },
      { text: " " },
      {
        text: `Role as Software Development Engineer`,
      },
      { text: " " },
      {
        ul: [
          `Develop front-end application from scratch using either Angular or ReactJS`,
          `Understand business needs and create quality mockups and prototypes`,
          `Ensure the technical feasibility of UI/UX designs`,
          `Optimize application for maximum speed and scalability`,
          `Ensure the coding from the back end to the database`,
          `Develop clean and structured HTML 5.0, CSS3 & JavaScript code for front-end design projects`,
          `Typescript experience`,
          `Creating responsive templates for websites & web applications`,
          `Good understanding of CSS pre-processing platforms, such as LESS and SASS`,
          `Experience with of at-least one of advanced JavaScript libraries and frameworks, such as Angular, ReactJS`,
          `Experience with UI components frameworks such as Bootstrap, Material, PrimeNG, Tailwind etc`,
          `Proficient understanding of cross-browser compatibility issues and ways to work around them`,
          `Engage with cross-functional teams (Architects, UI, Backend, Business) to analyze and deploy the application with quality standards.`,
          `Implement mobile apps using, Xamarin-Forms/Android/iOS, Java/swift/objective-c/c#.`,
          `Debug with Xamarin-profilers, Instrumentation.`,
          `Interact with technical and non-technical teams to extract and articulate on requirements.`,
          `Follow development and coding guidelines based on the platform`,
          `Perform thorough code reviews and improve the standards of the team.`,
          `Deploy the application to marketplace platforms such as App Store, Google Play Store. Strong knowledge in C#, Nuget Package creation, and fair knowledge of Web services.`,
          `Mobile application developer using with prior experience participating in the majority of SDLC Phases.(Requirements, Design, Develop, Testing, Deployment, and Support).`,
          `Strong knowledge in data structures, algorithms, and object-oriented design`,
          `Strong knowledge of MVVM. Fair understanding of MAUI.`,
          `Experience in developing applications with features but not limited to REST full services, integrating thirdparty libraries.`,
          `Push Notification, Barcode scanner, Application Updates, and versioning.`,
          `Seamless performance of web app when switching offline/online. Running Background services.`,
          `Prior experience in designing and using RESTfull API.`,
          `Familiarity with native IDE's, build and SDK bundle tools for Android Studio, XCode.`,
          `Strong understanding of Application Life Cycle and State machines`,
          `Experience in Enterprise mobile application development Strong experience with Jira,Git and code versioning tools such as Github, Bitbucket, Azure DevOps etc.`,
          `Knowledge of build and package management tool like Grunt, Gulp, Bower, npm is big plus`,
          `Learning & Understanding of REST APIs ASP.Net, MVC, SPA is a plus.`,
          `Developer, you will be responsible for designing, developing, and testing UI software for cutting edge web solutions.`,
          `Design, build and maintain efficient, reusable, and reliable codes by setting expectations and features priorities throughout the development life cycle. Translating designs into high-quality code.`,
          `Work with front end team in building high quality user interfaces for web applications Coordinate with UX, product & backend engineering teams in developing & integrating product features`,
          `Optimizing components for maximum performance across a vast array of web-capable devices and browsers. Analyzing user requirements, envisioning system features and functionality.`,
          `Identify bottlenecks and bugs and recommend system solutions by comparing advantages and disadvantages of custom development. Creating database schemas that represent and support business processes.`,
          `Build reusable code and libraries for future use. Develop new product features and new applications within an Agile environment. Develops scenarios, task flows, wireframes, interactive prototypes, and navigation models`,
          `As a developer, you will be involved from conception to completion with projects that are technologically
  sound and aesthetically impressive. You will ensure that these components and the overall application are
  robust and easy to maintain.`,
          `Define and follow coding patterns to support high-performance and scalable products with a minimal footprint. You will coordinate with the rest of the team working on different layers of the infrastructure.`,
          `Therefore, a commitment to collaborative problem solving, sophisticated design, and quality product is important.`,
          `Collaborate with designers to implement and improve design comps. Optimize applications for maximum speed and scalability. Define and follow coding patterns to support high-performance and scalable products with a minimal footprint.`,
          `Should have in-depth knowledge of JavaScript and React concepts, excellent front-end coding skills, and a good understanding of progressive web applications. Must be able to design and build modern user interface components to enhance application performance`,
          `Ensure effective Design, Development, Validation and Support activities in line with the product requirements and architectural requirements. Ensure continual knowledge management. Adherence to the organizational guidelines and processes.`,
          `Meeting with the development team to discuss user interface ideas and applications. Reviewing application requirements and interface designs. Identifying web-based user interactions.`,
          `The ideal candidate will be responsible for designing, developing, testing, and debugging responsive web applications for the company.`,
          `Develop standard code that can serve as the foundation of future projects`,
          `Perform tasks accurately and up to our quality standard & translate wireframes and sketches into working prototypes to highly visible end user-facing features`,
          `Exposure to Web standards, Responsive design, and cross-browser compatibility, SEO.`,
          `In Xamarin-Forms/Android/iOS Forms mobile application developer and integration to cloud services (AWS/GCP/Azure).`,
          `Deliver fully functional and well-tested mobile & Web applications and comply with quality standards.`,
          `Analyse, Design, Implement, Integrate functional requirements in legacy and new solutions.`,
        ],
        pageBreak: "after",
      },
      //next page
      {
        text: `Operational Responsibility`,
      },
      { text: " " },
      {
        ul: [
          `Submit end day work report regularly during the period as instructed periodically.`,
          `Reporting to the Head of India Operations, Manager - Business Operations and Strategy acts as a senior
  dynamic individual who actively helps the Head of Operations and other senior leaders in the Operations
  function to:`,
          `Design and implement interventions to drive operational excellence`,
          `Design, implement and follow-through on KPIs and scorecards`,
          `Accelerate strategic projects`,
          `Support in the implementation of robust management systems and contribute to high priority initiatives`,
          `This will be a fast paced role and will require the flexibility to meet aggressive deadlines with multiple, parallel and complex projects with organization-wide impact.`,
          `Success in this role requires strong business acumen, financial knowledge, good communication skills, agility, eye for detail and the ability to influence.`,
          `This role is an exceptional opportunity for a high potential individual with aggressive career goals to get hands-on experience of multiple facets of running business operations.`,
          `Weekly hours of engagement will generally be above average and there will be high demands of crunch times for key project deliverables and during periods of strategic review.`,
          `Prepare business cases, strategy materials, management committee materials, project updates etc.`,
          `Participate in strategic discussions, decision making and the active implementation of key initiatives`,
          `Attend meetings with and in many circumstances on behalf of Head Operations. Act as meeting chair, scribe, facilitator or active participant, as required`,
          `Prepare, edit or augment presentations, pre-reads and business case materials to be sent to management committee and other audiences`,
          `Build and maintain productive and highly collaborative relationships with Operations leaders`,
          `Coordinate with senior leaders within the Operations function and across Fawr to ensure strategic goals are achieved and effectively communicated`,
          `Collaborate with various business leaders to develop, track and target team wide success metrics across all operational units`,
          `Serve as liaison between teams and management regarding company culture, employee well-being, project updates, proposals and planning`,
          `Adhere to Rival Company established policies and procedures`,
        ],
        pageBreak: "after",
      },
      //next page
      {
        text: `Terms and Conditions of Employment:`,
      },
      { text: " " },
      {
        text: `These Terms and Conditions of Employment are effective from 2nd - January -23 on which date your employment with the Company becomes effective.`,
      },
      { text: " " },
      {
        ol: [
          `Appointment & Date of Joining: Your employment with the Company takes effect from 2nd - January -23.`,
          `Reporting: Your work location will be Remote (Work from Home)`,
          `Duration of Employment: You will be a part of Fawr at your offered role from 2nd - January -23 to 25th April 23.`,
          `Pay And Benefits: Your Fixed Total pay would be INR 30,000 and it may be supplemented by additional Flexible bonuses of upto INR 20,000 depending on the quality of performance delivered. *Lump sum amount will be paid at the successful completion of internship.`,
          `Leaves: You are eligible for upto 2 paid emergency/sick leaves per month.`,
          `Hours of Work: Your normal hours of work will 5-6 hours per day, irrespective of shifts, six days a week (Monday to Saturday). The Company may, at any time, in its sole discretion, require you to work beyond`,
          `Hours of Work: Your normal hours of work will 5-6 hours per day, irrespective of shifts, six days a week (Monday to Saturday). The Company may, at any time, in its sole discretion, require you to work beyond 6 (six) hours a day, upon notice to you, as required and determined by workflow and Company commitments, and you may be required to work such hours as are necessary to fulfil the full scope of your role title. Total 540 Working hours to be contributed.`,
          `Duties & Transfer: A schedule of your broad duties and responsibilities will be given to you in due course. However, you are expected to devote your Skills, Time & Proficiency exclusively for job & dutiesassigned to you during the course of your employment.`,
          `Resignation and Termination of Service: You are required to service of a notice period of 15 days in case of early termination. Failing to do so will result in forfeiting of stipend of the running month. The company does not adjust leave encashment against shortfall of notice period is calculated on the Gross monthly salary and leave encashment is calculated on basic salary. Any short fall in the notice period will be recovered from all the dues payable on full & final settlement payable; and if any dues are payable to the company on full and final need to pay to company.`,
          ` Code of Conduct: You are expected to abide by the Company’s Code of Conduct policy. You are required to devote your full attention and abilities exclusively for the business of the Company and shall in all respects obey and conform to the regulations from time to time framed and issued by the Company and applicable to you.`,
          `Company Property: You should be maintaining assets given to you for the performance of duties in good moral standard and with good business ethics. On the periodic asset audit, you shall be providing theasset for verification and confirmation from time to time. You will return the same immediately on demand or on relinquishment of your services failing which the cost of the same will be recovered from you.`,
          [
            {
              text: `Confidentiality: You agree that as part of your employment with the Company, you will have access, directly or indirectly, to certain Confidential Information of the Company, its affiliates, employees, contractors and/or clients. At any time during the term of employment, you agree to execute non-disclosure or similar agreements required by the Company and its affiliates and their employees, contractors and/or clients, with respect to such Confidential Information. You shall, during the term of your employment with the Company, and thereafter:`,
            },

            {
              ul: [
                `Hold the Confidential Information in the strictest confidence`,
                `Not disclose or use or attempt to use or disclose, the Confidential Information, except as expressly permitted by the Company, and solely for the purpose of which such Confidential Information was disclosed to you`,
                `Not disclose or divulge the Confidential Information to, or for the benefit of any third person or entity, withoutthe prior authorization of the Company.`,
                `Give prompt notice to Company, of any actual or attempted or perceived unauthorized use or disclosure of Confidential Information`,
                `Return the Confidential Information, including any copies or reproductions thereof, at Company request, or upon termination of your employment.`,
              ],
            },
          ],
          [
            {
              text: `Intellectual Property: Any Intellectual Property shall be disclosed to the Company whetherconceived apprehended or learned by you during the course of, or after the termination of youremployment, and you shall give to the Company all such explanations, demonstrations and instructions as the Company may deem appropriate to enable the full effectual working production and use of the same. All Intellectual Property, irrespective of whether made, devised or discovered during normal working hours or using the facilities of the Company, whether alone or jointly with others, shall be the exclusive property of the Company. You hereby convey ownership in all such Intellectual Property to the Companyupon inception or development. To the extent that the Company is not the immediate owner of the Intellectual Property, you irrevocably assign all Intellectual Property to the Company, in perpetuity and on a worldwide basis. This assignment shall not lapse in any circumstances, including upon the failure of the Company to exercise its rights under the assignment for any period.`,
            },
            { text: " " },
            {
              text: `You shall at all times, whether during the course of, or after the termination of your employment:`,
            },
            { text: " " },
            {
              ul: [
                `Not (unless with the prior written consent of the Company) apply for any patent, design or other registration asthe case may be, either in India, or in any other part of the world for any Intellectual Property conceived or made by you.`,
                `without prejudice to the above bullet point, if and whenever required by the Company to do so (and in such manner as the Company shall in its sole discretion decide) apply as a nominee of, or jointly with the Company, for patent, design or other registration in India, and as the Company may require any other part of the world for any Intellectual Property and without additional payment, shall execute all such documents, deeds, undertakings, declarations, and do all such things as may be necessary to effectively obtain or vest in the Company, the legal and beneficial ownership of all applications at any time, and from time to time pending and all resulting patents, design and other Intellectual Property registration when granted, and all right title and interest to and in the same in the Company absolutely.`,
                `To the extent that the full title in any Intellectual Property is not automatically vested in the Company, you agree to irrevocably assign, in perpetuity and on a worldwide and royalty free basis, all such Intellectual Property produced by you during your employment, whether during normal hours of work of the Company or otherwise or at the premises or using the facilities of the Company or otherwise, to the Company.`,
                `Waive all moral rights arising from any such works or material so far as you may lawfully do so in favor of the Company.`,
                `The Company shall pay all expenses in connection with any application for patent design or other registration made by you as nominee for, or jointly with the Company, pursuant to this Section of your terms and conditions.`,
                `Nothing in these Terms and Conditions of Employment shall oblige the Company to seek patent or other protection for any Intellectual Property or to exploit any such Intellectual Property.`,
                `It shall be presumed (but subject to proof to the contrary) that the subject matter of any application for a patent, design or other Intellectual Property registration filed by you or any assignee or agent of yourself within 12 months after the termination of your employment, and relating to goods or services of a kind with which you were concerned in the course of your duties, is IntellectualProperty made by you during your employment with the Company.`,
                `For the purposes of these terms and conditions "Intellectual Property" means any patents, inventions, know- how, trade secrets and other confidential information, registered designs, copyrights, data, database rights, design rights, rights affording equivalent protection to copyright, database rights and design rights, semiconductor topography rights, trademarks, service marks, logos, domain names, business names, trade names, moral rights, and all registrations or applications to register any of the items referred to above, equivalent or similar rights to these rights in any other country or jurisdiction, rights in the nature of unfair competition rights and rights to sue for passing-offconceived or made by you during the course of or arising outof your employment with the Company (whether alone or together with any other person or persons) and which concern or are applicable to products or articles manufactured or sold by, or services provided by the Company.`,
              ],
            },
          ],
        ],
      },
      { text: " " },
    ],
    styles: {
      name: {
        fontSize: 18,
        bold: true,
        margin: [0, 20, 0, 10],
      },
      role: {
        fontSize: 18,
        margin: [0, 0, 0, 10],
      },
    },
  };

  useEffect(() => {
    fixedPayChangeHandler();
  }, [
    form.values.fixedBasicPay,
    form.values.fixedDearnessAllowance,
    form.values.fixedESIC,
    form.values.fixedBonus,
    form.values.fixedOtherAllowance,
  ]);

  function fixedPayChangeHandler() {
    form.setValues({
      annualFixedPay:
        Number(form.values.fixedBasicPay) +
        Number(form.values.fixedDearnessAllowance) +
        Number(form.values.fixedESIC) +
        Number(form.values.fixedBonus) +
        Number(form.values.fixedOtherAllowance),
    });
  }

  useEffect(() => {
    flexiblePayChangeHandler();
  }, [
    form.values.flexibleIncrement,
    form.values.flexibleIncentive,
    form.values.flexibleAppraisal,
    form.values.flexibleBonus,
  ]);

  function flexiblePayChangeHandler() {
    form.setValues({
      annualFlexiblePay:
        Number(form.values.flexibleIncrement) +
        Number(form.values.flexibleIncentive) +
        Number(form.values.flexibleAppraisal) +
        Number(form.values.flexibleBonus),
    });
  }
  useEffect(() => {
    retirementChangeHandler();
  }, [form.values.retirementProvidentFund, form.values.retirementGratuity]);

  function retirementChangeHandler() {
    form.setValues({
      annualRetirementBenefits:
        Number(form.values.retirementProvidentFund) +
        Number(form.values.retirementGratuity),
    });
  }
  useEffect(() => {
    totalChangeHandler();
  }, [
    form.values.fixedBasicPay,
    form.values.fixedDearnessAllowance,
    form.values.fixedESIC,
    form.values.fixedBonus,
    form.values.fixedOtherAllowance,
    form.values.flexibleIncrement,
    form.values.flexibleIncentive,
    form.values.flexibleAppraisal,
    form.values.flexibleBonus,
    form.values.retirementProvidentFund,
    form.values.retirementGratuity,
  ]);

  function totalChangeHandler() {
    form.setValues({
      totalGrossSalary:
        Number(form.values.fixedBasicPay) +
        Number(form.values.fixedDearnessAllowance) +
        Number(form.values.fixedESIC) +
        Number(form.values.fixedBonus) +
        Number(form.values.fixedOtherAllowance) +
        Number(form.values.flexibleIncrement) +
        Number(form.values.flexibleIncentive) +
        Number(form.values.flexibleAppraisal) +
        Number(form.values.flexibleBonus) +
        Number(form.values.retirementProvidentFund) +
        Number(form.values.retirementGratuity),
    });
  }

  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 5 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <div className="flex justify-center">
      <div className="p-10 w-[700px]">
        <Stepper active={active} onStepClick={setActive} breakpoint="sm">
          <Stepper.Step label="Step" description="Personal Information">
            <div className="w-full flex flex-col space-y-2 h-[400px] overflow-y-scroll no-scrollbar">
              <span className="border-b-2 max-w-max text-xl font-semibold">
                Personal Information
              </span>
              <div className="w-full flex flex-col space-y-1">
                <div className="w-full flex space-x-2">
                  <TextInput
                    label="CID"
                    className="w-full"
                    disabled
                    value={form.values.cid}
                  />
                </div>
                <div className="w-full flex space-x-2 ">
                  <TextInput
                    label="First Name"
                    className="w-full"
                    {...form.getInputProps("firstName")}
                  />
                  <TextInput
                    label="Second Name"
                    className="w-full"
                    {...form.getInputProps("lastName")}
                  />
                </div>
                <div className="w-full flex space-x-2 ">
                  <TextInput
                    label="Address line 1"
                    className="w-full"
                    {...form.getInputProps("address1")}
                  />
                  <TextInput
                    label="Address line 2"
                    className="w-full"
                    {...form.getInputProps("address2")}
                  />
                </div>
                <div className="w-full flex space-x-2 ">
                  <TextInput
                    label="Mobile Number"
                    type="number"
                    className="w-full"
                    {...form.getInputProps("mobile")}
                  />
                </div>
              </div>
            </div>
          </Stepper.Step>
          <Stepper.Step label="Step" description="Job Type">
            <Select
              label="Job Type"
              placeholder="Pick one"
              className=" h-[400px] overflow-y-scroll no-scrollbar"
              data={[
                {
                  value: "Undergraduate",
                  label: "Undergraduate",
                  group: "Internship",
                },
                {
                  value: "Advanced Level Graduates",
                  label: "Advanced Level Graduates",
                  group: "Internship",
                },
                { value: "Freshers", label: "Freshers", group: "Internship" },
                { value: "Graduates", label: "Graduates" },
                { value: "Mid-Senior Level", label: "Mid-Senior Level" },
                { value: "Professionals", label: "Professionals" },
                { value: "Consultants", label: "Consultants" },
                { value: "Vice-President", label: "Vice-President" },
                { value: "Business Partners", label: "Business Partners" },
              ]}
              {...form.getInputProps("jobType")}
            />
          </Stepper.Step>
          <Stepper.Step label="Step" description="Job Details">
            <div className="w-full flex flex-col space-y-2 h-[400px] overflow-y-scroll no-scrollbar">
              <span className="border-b-2 max-w-max text-xl font-semibold">
                Job Details
              </span>
              <div className="w-full flex flex-col space-y-1">
                <div className="w-full flex space-x-2 ">
                  <Select
                    label="Company Name"
                    className="w-full"
                    data={[
                      {
                        value: "FAWR Business Solutions",
                        label: "FAWR Business Solutions",
                      },
                      { value: "FAWR Technology", label: "FAWR Technology" },
                      {
                        value: "FAWR Medical Solutions",
                        label: "FAWR Medical Solutions",
                      },
                      {
                        value: "FAWR Legal Solutions",
                        label: "FAWR Legal Solutions",
                      },
                    ]}
                    {...form.getInputProps("companyName")}
                  />
                  <TextInput
                    label="Position"
                    className="w-full"
                    {...form.getInputProps("position")}
                  />
                </div>
                <div className="w-full flex space-x-2 ">
                  <TextInput
                    label="Application Type"
                    className="w-full"
                    {...form.getInputProps("applicationType")}
                  />
                  <TextInput
                    label="Acceptance Time Limit"
                    className="w-full"
                    {...form.getInputProps("applicationTimeLimit")}
                  />
                </div>
                {form.values.jobType != "Undergraduate" &&
                form.values.jobType != "Advanced Level Graduates" &&
                form.values.jobType != "Freshers" ? (
                  <>
                    <div className="w-full flex space-x-2 ">
                      <TextInput
                        label="Role"
                        className="w-full"
                        {...form.getInputProps("role")}
                      />
                      <TextInput
                        label="Career Level"
                        className="w-full"
                        {...form.getInputProps("carrerLevel")}
                      />
                    </div>
                    <div className="w-full flex space-x-2 ">
                      <TextInput
                        label="Grade"
                        className="w-full"
                        {...form.getInputProps("grade")}
                      />
                      <TextInput
                        label="Talent Segment"
                        className="w-full"
                        {...form.getInputProps("talentSegment")}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-full flex space-x-2 ">
                      <TextInput
                        label="Role"
                        className="w-full"
                        {...form.getInputProps("role")}
                      />
                      <TextInput
                        label="Talent Segment"
                        className="w-full"
                        {...form.getInputProps("talentSegment")}
                      />
                    </div>
                  </>
                )}

                <div className="w-full flex space-x-2 ">
                  <Select
                    label="Location"
                    className="w-full"
                    data={[
                      { value: "Bengaluru", label: "Bengaluru" },
                      { value: "Chennai", label: "Chennai" },
                      { value: "Coimbatore", label: "Coimbatore" },
                      { value: "Pune", label: "Pune" },
                    ]}
                    {...form.getInputProps("location")}
                  />
                </div>
              </div>
            </div>
          </Stepper.Step>
          <Stepper.Step label="Step" description="Salary Components">
            <div className="h-[400px] overflow-y-scroll flex flex-col space-y-4">
              <div className="w-full flex flex-col space-y-2">
                <span className="border-b-2 max-w-max text-xl font-semibold">
                  Fixed Components
                </span>
                <div className="w-full flex flex-col space-y-1">
                  <div className="w-full flex space-x-2 ">
                    <TextInput
                      label="Basic Pay"
                      type="number"
                      className="w-full"
                      {...form.getInputProps("fixedBasicPay")}
                    />
                    <TextInput
                      label="Dearness Allowance (DA)"
                      type="number"
                      className="w-full"
                      {...form.getInputProps("fixedDearnessAllowance")}
                    />
                  </div>
                  <div className="w-full flex space-x-2 ">
                    <TextInput
                      label="Other Allowance"
                      type="number"
                      className="w-full"
                      {...form.getInputProps("fixedOtherAllowance")}
                    />
                    <TextInput
                      label="ESIC"
                      type="number"
                      className="w-full"
                      {...form.getInputProps("fixedESIC")}
                    />
                  </div>
                  <div className="w-full flex space-x-2 ">
                    <TextInput
                      label="Bonus"
                      type="number"
                      className="w-full"
                      {...form.getInputProps("fixedBonus")}
                    />
                    <TextInput
                      label="Annual Fixed Pay"
                      type="number"
                      className="w-full"
                      value={form.values.annualFixedPay}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col space-y-2">
                <span className="border-b-2 max-w-max text-xl font-semibold">
                  Flexible Components
                </span>
                <div className="w-full flex flex-col space-y-1">
                  <div className="w-full flex space-x-2 ">
                    <TextInput
                      label="Increment"
                      type="number"
                      className="w-full"
                      {...form.getInputProps("flexibleIncrement")}
                    />
                    <TextInput
                      label="Incentive"
                      type="number"
                      className="w-full"
                      {...form.getInputProps("flexibleIncentive")}
                    />
                  </div>
                  <div className="w-full flex space-x-2 ">
                    <TextInput
                      label="Appraisal"
                      type="number"
                      className="w-full"
                      {...form.getInputProps("flexibleAppraisal")}
                    />
                    <TextInput
                      label="Bonus"
                      type="number"
                      className="w-full"
                      {...form.getInputProps("flexibleBonus")}
                    />
                  </div>
                  <div className="w-full flex space-x-2 ">
                    <TextInput
                      label="Annual Flexible Pay"
                      type="number"
                      className="w-full"
                      {...form.getInputProps("annualFlexiblePay")}
                    />
                  </div>
                </div>
              </div>

              {form.values.jobType != "Undergraduate" &&
                form.values.jobType != "Advanced Level Graduates" &&
                form.values.jobType != "Freshers" && (
                  <div className="w-full flex flex-col space-y-2">
                    <span className="border-b-2 max-w-max text-xl font-semibold">
                      Retirement Benefits
                    </span>
                    <div className="w-full flex flex-col space-y-1">
                      <div className="w-full flex space-x-2 ">
                        <TextInput
                          label="Retirement Provident Fund"
                          type="number"
                          className="w-full"
                          {...form.getInputProps("retirementProvidentFund")}
                        />
                        <TextInput
                          label="Retirement Gratuity"
                          type="number"
                          className="w-full"
                          {...form.getInputProps("retirementGratuity")}
                        />
                      </div>
                      <div className="w-full flex space-x-2 ">
                        <TextInput
                          label="Annual Retirement Benefits"
                          type="number"
                          className="w-full"
                          {...form.getInputProps("annualRetirementBenefits")}
                        />
                      </div>
                      <div className="w-full flex space-x-2 ">
                        <TextInput
                          label="Annual Total Gross Salary (TGS) / CTC (1 + 2 + 3)"
                          type="number"
                          className="w-full"
                          {...form.getInputProps("totalGrossSalary")}
                        />
                      </div>
                    </div>
                  </div>
                )}
            </div>
          </Stepper.Step>
          <Stepper.Step label="Step" description="Additional Information">
            <div className="w-full flex flex-col space-y-2 h-[400px] overflow-y-scroll no-scrollbar">
              <span className="border-b-2 max-w-max text-xl font-semibold">
                Additional Information
              </span>
              <div className="w-full flex flex-col space-y-1">
                <div className="w-full flex space-x-2 ">
                  <TextInput
                    label="Business Deal"
                    className="w-full"
                    {...form.getInputProps("businessDeal")}
                  />
                  <TextInput
                    label="Self Medical Insurance"
                    type="number"
                    className="w-full"
                    {...form.getInputProps("selfMedicalInsurance")}
                  />
                </div>
                <div className="w-full flex space-x-2 ">
                  <TextInput
                    label="Self Medical Insurance down payment"
                    type="number"
                    className="w-full"
                    {...form.getInputProps("selfMedicalInsuranceDownPayment")}
                  />
                  <TextInput
                    label="Parent's Medical Insurance"
                    type="number"
                    className="w-full"
                    {...form.getInputProps("parentMedicalInsurance")}
                  />
                </div>
                <div className="w-full flex space-x-2 ">
                  <TextInput
                    label="Parent's Insurance down payment"
                    type="number"
                    className="w-full"
                    {...form.getInputProps("parentMedicalInsuranceDownPayment")}
                  />
                  <TextInput
                    label="Life Insurance"
                    type="number"
                    className="w-full"
                    {...form.getInputProps("lifeInsurance")}
                  />
                </div>
                <div className="w-full flex space-x-2 ">
                  <TextInput
                    label="Relocation Allowance"
                    type="number"
                    className="w-full"
                    {...form.getInputProps("relocationAllowance")}
                  />
                  <TextInput
                    label="Relocation Allocation Penalty Time"
                    type="number"
                    className="w-full"
                    {...form.getInputProps("relocationAllowancePenaltyTime")}
                  />
                </div>
              </div>
            </div>
          </Stepper.Step>
          <Stepper.Completed>
            <div className="flex flex-col space-y-6  h-[400px] overflow-y-scroll">
              <Accordion defaultValue="customization">
                <Accordion.Item value="annextureI">
                  <Accordion.Control>Annexture I</Accordion.Control>
                  <Accordion.Panel>
                    <p>
                      As per Indian Provident Fund (PF) regulations, membership
                      to the Provident Fund is mandatory for all International
                      Workers. Exemptions if any shall be as per the existing
                      law. Kindly note that since your cost to the Company (CTC)
                      includes employees as well as employers contribution to
                      Provident Fund, appropriate adjustment in your monthly
                      salary will be made for Provident Fund contributions as
                      per applicable laws/regulation in existence (or amendments
                      from time to time). Withdrawal (if any) from Provident
                      Fund is regulated by the government of India and is
                      subject to government approvals and prevailing laws
                      (amended from time to time). Any person desirous of such
                      withdrawal need to comply with applicable law and
                      procedures laid down by the authorities.
                    </p>
                    <br />
                    <p>
                      If you are currently eligible to receive Statutory Bonus,
                      such amounts will be calculated on an annual figure and
                      paid (as per prevailing law) to you on a monthly basis
                      every year. Please note that your variable pay/variable
                      bonus is inclusive of the Stat Bonus amounts if payable to
                      you. Such stat bonus will be accordingly adjusted against
                      variable pay. Excess variable pay, if any, post adjustment
                      of Stat Bonus will be paid as per Company evaluation
                      process applicable to your career level as per company
                      payroll cycle.
                    </p>
                    <br />
                    <p>
                      All compensation will be paid to you after deduction of
                      tax at source, in accordance with applicable law. You will
                      be solely liable for your personal tax liabilities, as per
                      applicable law, both in India and abroad.
                    </p>
                    <br />
                    <p>
                      In addition to your total cash compensation, you will be
                      eligible for following benefits, which will be governed by
                      Company guidelines:
                    </p>

                    <ol>
                      <li>
                        <p>
                          Effective your date of transfer Medical Insurance for
                          self, spouse and 2 dependent children up to INR
                          300,000 per annum. Premium for this will be deducted
                          from CTC.
                        </p>
                        <br />
                        <p>
                          You have the option of availing Fawr Business
                          Solutions negotiated rates to cover your parents,
                          parents in-law and any additional child under a
                          separate Insurance plan up to INR 500,000 per annum.
                          The entire premium for this will have to be borne by
                          you. This plan allows for coverage of pre-existing
                          ailments.
                        </p>
                        <br />
                        <p>
                          For Permissible claims under the Medical Insurance
                          plans detailed above, you will be required to
                          contribute a defined co pay, as under:
                        </p>
                        <ul>
                          <li>
                            10% of such claims for self, spouse and 2 dependent
                            children
                          </li>
                          <li>
                            20% of such claims for parents, parents in-law and
                            additional children under the separate Insurance
                            plan
                          </li>
                        </ul>
                      </li>
                      <li>
                        Personal Accident coverage up to two times your annual
                        fixed compensation
                      </li>
                      <li>
                        Life Insurance coverage equivalent to one time of annual
                        fixed compensation with a minimum cover of INR 5,00,000
                      </li>
                      <li>Gratuity as per The Payment of Gratuity Act, 1972</li>
                    </ol>
                    <br />
                    <p>
                      One time relocation allowance is subject to maximum of INR
                      30000 on submission of actual supporting as per policy.
                      Refer to the attached relocation assistance handbook for
                      details. In the unlikely event you choose to leave the
                      Company or if your services are terminated for any reason
                      whatsoever before the completion of 12 months of
                      employment with the Company, the relocation allowance will
                      be construed as debt due and should be repaid fully by you
                      before your last working day.
                    </p>
                    <br />
                    <p>
                      The Company may, at any time and in its sole and absolute
                      discretion, amend, suspend, vary and modify any of the
                      terms and conditions of the above mentioned benefits.
                    </p>
                    <br />
                    <p>
                      Following the implementation to the GST regulations with
                      effect from July 1st 2017, kindly note the treatment to
                      any continuing obligations that you have, pursuant to any
                      signing/joining/relocation/retention bonus as per the
                      terms of your employment, will be as under:
                    </p>
                    <br />
                    <p>
                      Any signing, joining, relocation or retention bonus
                      received by you will be paid along with salary of the
                      relevant or succeeding pay month. This amount is
                      recoverable as per your employment terms, if your service
                      commitment with Fawr Business Solutions changes. Any such
                      recovery or adjustment shall be made from your salary
                      pertaining to the service month before your last working
                      day in the Company. Any shortfalls will be adjusted
                      against any further amounts due and payable to you.
                    </p>
                  </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="annextureII">
                  <Accordion.Control>Annexture II</Accordion.Control>
                  <Accordion.Panel>
                    <p>
                      I hereby represent and warrant that as of my effective
                      start date of employment with Fawr Business Solutions
                      (here after referred to as the Company), I will have: (a)
                      terminated my employment with any current/previous
                      employer and any other employment or contractor
                      relationships; and (b) satisfactorily performed and
                      completed all my obligations which apply/applied to me via
                      any current/previous employer and any other employment or
                      contractor relationships.
                    </p>
                    <br />
                    <p>
                      I hereby represent and warrant that I have not, during the
                      course of any current/previous employer and any other
                      employment or contractor relationships, entered into or
                      agreed to any arrangement which may restrict, prohibit or
                      debar or conflict, or be inconsistent with my acceptance
                      of the offer made by the Company or employment with the
                      Company, including, but not limited to, any time-bound
                      non-compete agreement, restrictive employment agreement or
                      other restrictive terms.
                    </p>
                    <br />
                    <p>
                      I hereby represent and warrant that I shall not bring into
                      the Company premises (or use in any manner) any third
                      party documents (regardless of media) or materials
                      (including but not limited to trade secrets) with myself
                      to the Company, including any such documents or materials
                      from my previous employer. To the extent I feel that my
                      employment at the Company would require me to bring any
                      third party documents or materials to the Company. I shall
                      not bring any such documents or materials unless I have
                      taken all permissions/approvals from the third parties
                      before accepting the offer from the Company. I further
                      represent and warrant that I have not and will not
                      inappropriately disclose or misuse any confidential
                      information obtained from and/or in connection with any
                      current/previous employer and any other employment or
                      contractor relationships. I agree and acknowledge that a
                      breach of this provision shall entitle the Company to
                      terminate my services with immediate effect.
                    </p>
                    <br />
                  </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="annextureIII">
                  <Accordion.Control>Annexture III</Accordion.Control>
                  <Accordion.Panel>
                    <p>
                      During On-boarding, you are required to have all the
                      documents as mentioned below, uploaded and approved in the
                      Fawr B Sol e-doc submit application 15 days prior to the
                      due date of confirmation. If you do not complete the e-doc
                      submission on or before this date, then the confirmation
                      would be postponed by three months from the initial due
                      date of confirmation and you would be confirmed on the 1st
                      day of the subsequent month only. The period of probation
                      can be extended by 3 months per instance of non -
                      completion for up to four times (up to a maximum of one
                      year).
                    </p>
                    <br />
                    <p>
                      Copies of the following will constitute the required
                      documents:
                    </p>
                    <ol>
                      <li>Class 10 (or equivalent) Marks Sheet (s)</li>
                      <li>Class 12 (or equivalent) Marks Sheet (s)</li>
                      <li>
                        Under Graduation Marks Sheet (s) & Degree completion
                        Certificate (both mandatory)
                      </li>
                      <li>Post Graduation Marks Sheet (s) (if applicable)</li>
                      <li>
                        Post Graduation Degree Certificate (if applicable)
                      </li>
                      <li>Diploma Certificate (if applicable)</li>
                      <li>
                        Prior Experience/ Relieving Certificate (s) (if
                        applicable)
                      </li>
                      <li>Passport</li>
                      <li>Aadhar Card (For Address proof)</li>
                      <li>
                        PAN Card (As per Income Tax rules, the disclosure of
                        your Permanent Account Number (PAN) to Fawr Business
                        Solutions is mandatory. So, kindly disclose your PAN to
                        company on or 30 days before the day of joining and note
                        that disclosure of PAN is a pre-condition for your
                        confirmation into the system)
                      </li>
                      <li>
                        Bank passbook front page image stating the bank account
                        details for processing salary
                      </li>
                      <li>Passport size photograph</li>
                      <li>
                        National Skills Registry (Employees are required to sign
                        the document at the time of joining and the upload of
                        the same will done by the On-boarding team)
                      </li>
                      <li>
                        Past 3 years employment details to be filed in
                        application (only for experienced/lateral entry
                        candidates)
                      </li>
                      <li>
                        {" "}
                        Letter Of authorization (self-declaration that not
                        involved in any criminal activities and subject to
                        convicted crime by any Police, Judicial)
                      </li>
                      <li>Other Support Documents for Back Ground Check.</li>
                    </ol>
                  </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="annextureIV">
                  <Accordion.Control>Annexture IV</Accordion.Control>
                  <Accordion.Panel>
                    <p>
                      There would be only one type of leave, which is Earned
                      Leave. During the 1st and 2nd year (including probationary
                      period as well as) of service, you would be eligible for
                      15 working days of leave per annum. The leave eligibility
                      shall begin in the respective quarter of your joining the
                      Company.
                    </p>
                    <br />
                    <p>
                      For example: If an employee joins the Company in quarter
                      three of the financial year 2010 - 2011, his / her leave
                      eligibility would start in quarter three of the financial
                      year 2010 - 2011. For the purpose of leave credit quarter
                      three of the financial year 2010 - 2011 will be considered
                      as the first quarter. Please note that leave shall be
                      credited on a pro-rated basis in the first quarter of the
                      employee’s employment. On completion of 2 years in
                      service, you shall be eligible for 20 working days leave
                      per annum which would be credited to the employee on a
                      quarterly basis. You would be eligible for the additional
                      leave from the 3rd year onwards from the quarter
                      succeeding the quarter in which you would be completing 2
                      years with the Company from the date of joining.{" "}
                    </p>
                    <br />
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>

              <Checkbox
                label="I agree with the Terms and Conditions"
                checked={checked}
                onChange={(event) => setChecked(event.currentTarget.checked)}
              />
              <button
                className="bg-blue-500 text-white border rounded-md py-1 px-3"
                disabled={!checked}
                onClick={() => {
                  if (
                    form.values.jobType != "Undergraduate" &&
                    form.values.jobType != "Advanced Level Graduates" &&
                    form.values.jobType != "Freshers"
                  )
                    handleSubmit(form.values);
                  else handleInternSubmit(form.values);
                }}
              >
                Submit
              </button>
            </div>
          </Stepper.Completed>
        </Stepper>

        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button className="!bg-blue-500" onClick={nextStep}>
            Next step
          </Button>
        </Group>
      </div>
    </div>
  );
}

export default Applicant;
