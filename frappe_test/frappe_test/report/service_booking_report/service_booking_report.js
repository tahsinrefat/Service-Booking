// Copyright (c) 2025, Tahsin Ahmed Refat and contributors
// For license information, please see license.txt

frappe.query_reports["Service Booking Report"] = {
	"filters": [
		{
			label: "From Date",
			fieldname: "from_date",
			fieldtype: "Date",
			default: get_first_day_of_month(),
		},
		{
			label: "To Date",
			fieldname: "to_date",
			fieldtype: "Date",
			default: get_last_day_of_month(),
		},
		{
			label: "Customer",
			fieldname: "customer",
			fieldtype: "Link",
			options: "Employee",
			only_select: true,
		},
		{
			label: "Service Type",
			fieldname: "SERVICE_TYPE",
			fieldtype: "Select",
			options: [
				" ",
				"Therapy",
				"Spa",
				"Others"
			],
		},
		{
			label: "Status",
			fieldname: "status",
			fieldtype: "Select",
			options: [
				" ",
				"Requested",
				"Approved",
				"Completed"
			],
		},
	]
};

function get_first_day_of_month() {
  let today = new Date();
  return `${today.getFullYear()}-${("0" + (today.getMonth() + 1)).slice(
    -2
  )}-01`;
}

// Helper function to get the last day of the current month
function get_last_day_of_month() {
  let today = new Date();
  let lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0); // last day of current month
  return `${lastDay.getFullYear()}-${("0" + (lastDay.getMonth() + 1)).slice(
    -2
  )}-${("0" + lastDay.getDate()).slice(-2)}`;
}
