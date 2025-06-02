// Copyright (c) 2025, Tahsin Ahmed Refat and contributors
// For license information, please see license.txt

frappe.ui.form.on("Service Booking", {
	refresh(frm) {

	},
    service_type: (frm) => {
        if (frm.doc.service_type != "Others" && (frm.doc.other_service_type != null || frm.doc.other_service_type != "")) {
            frm.set_value("other_service_type", null);
        }
    }
});
