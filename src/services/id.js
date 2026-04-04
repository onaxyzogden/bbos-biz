// Prefixed ID generation
import { nanoid } from 'nanoid';

export const genProjectId = () => 'proj_' + nanoid(12);
export const genTaskId = () => 'tsk_' + nanoid(12);
export const genColumnId = () => 'col_' + nanoid(8);
export const genSubtaskId = () => 'sub_' + nanoid(8);
export const genCheckId = () => 'chk_' + nanoid(8);
export const genUserId = () => 'usr_' + nanoid(12);

// Money module
export const genExpenseId = () => 'exp_' + nanoid(12);
export const genInvoiceId = () => 'inv_' + nanoid(12);
export const genCategoryId = () => 'cat_' + nanoid(8);
export const genBudgetId = () => 'bud_' + nanoid(8);
export const genLineItemId = () => 'li_' + nanoid(8);

// People module
export const genEmployeeId = () => 'per_' + nanoid(12);
export const genAttendanceId = () => 'att_' + nanoid(12);
export const genLeaveRequestId = () => 'lvr_' + nanoid(12);
export const genTimeEntryId = () => 'tim_' + nanoid(12);

// Contacts module (unified people + CRM)
export const genCompanyId = () => 'cmp_' + nanoid(12);
export const genHRId = () => 'hr_' + nanoid(12);
export const genAbsenceId = () => 'abs_' + nanoid(12);
export const genClockInId = () => 'clk_' + nanoid(12);
export const genSalaryId = () => 'sal_' + nanoid(12);
export const genContactDocId = () => 'cdoc_' + nanoid(12);

// Office module
export const genChannelId = () => 'chn_' + nanoid(8);
export const genMessageId = () => 'msg_' + nanoid(12);
export const genEventId = () => 'evt_' + nanoid(12);
export const genDocumentId = () => 'doc_' + nanoid(12);
export const genQAId = () => 'qa_' + nanoid(12);
export const genAnswerId = () => 'ans_' + nanoid(8);

// Tech module
export const genMonitorId = () => 'mon_' + nanoid(12);
export const genAlertId = () => 'alt_' + nanoid(12);
export const genPerfEntryId = () => 'prf_' + nanoid(12);
export const genStackItemId = () => 'stk_' + nanoid(12);

// CRM module
export const genContactId = () => 'con_' + nanoid(12);
export const genDealId = () => 'dea_' + nanoid(12);
export const genActivityId = () => 'act_' + nanoid(12);
export const genPipelineStageId = () => 'pip_' + nanoid(8);
