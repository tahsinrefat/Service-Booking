// Copyright (c) 2025, Tahsin Ahmed Refat and contributors
// For license information, please see license.txt

frappe.ui.form.on("Service Booking", {
    refresh(frm) {

    },
    service_type: (frm) => {
        if (frm.doc.service_type != "Others" && (frm.doc.other_service_type != null || frm.doc.other_service_type != "")) {
            frm.set_value("other_service_type", null);
        }
    },
    before_workflow_action: (frm) => {
        const action = frm.selected_workflow_action;

        if (['Request', 'Approve', 'Complete', 'Reject', 'Cancel'].includes(action)) {
            frappe.dom.unfreeze();
            
            return new Promise((resolve, reject) => {
                if (action === 'Complete') {
                    let rating_dialog = new frappe.ui.Dialog({
                        title: 'Complete Service Booking',
                        fields: [
                            {
                                label: 'Rating',
                                fieldname: 'rating',
                                fieldtype: 'Rating',
                                reqd: 1,
                                description: 'Please rate the service before completion'
                            }
                        ],
                        size: 'small',
                        primary_action_label: 'Complete',
                        primary_action(values) {
                            if (!values.rating) {
                                frappe.msgprint({
                                    title: __("Validation Error"),
                                    indicator: "orange",
                                    message: __("Please provide a rating."),
                                });
                                return;
                            }

                            // Add rating as comment
                            frappe.call({
                                method: "frappe.desk.form.utils.add_comment",
                                args: {
                                    reference_doctype: frm.doctype,
                                    reference_name: frm.docname,
                                    content: __("Service Rating: ") + values.rating + " stars",
                                    comment_email: frappe.session.user,
                                    comment_by: frappe.session.user_fullname,
                                },
                                callback: function (r) {
                                    if (!r.exc) {
                                        rating_dialog.hide();
                                        resolve();
                                    }
                                },
                            });
                        },
                        secondary_action_label: 'Cancel',
                        secondary_action() {
                            rating_dialog.hide();
                            reject('User cancelled the action');
                        }
                    });
                    rating_dialog.show();
                } else {
                    frappe.confirm(
                        `Are you sure you want to ${action} this booking?`,
                        () => {
                            resolve();
                        },
                        () => {
                            reject('User cancelled the action');
                        }
                    );
                }
            });
        }
    }
});