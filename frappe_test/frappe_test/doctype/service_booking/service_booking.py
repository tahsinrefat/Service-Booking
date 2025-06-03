# Copyright (c) 2025, Tahsin Ahmed Refat and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class ServiceBooking(Document):
	def validate(self):
		self.send_email()
		pass

	def on_submit(self):
		self.send_email()
  
	def send_email(self):
		recipient = frappe.db.get_value(
			"Employee",
			self.customer,
			"user_id"
		)
  
		subject = "Service Booking Confirmation"
		message = "Hello "+self.customer_name+",\n"+"Your Requested Appointemnt on "+self.datetime+" has been approved. We expect your timely arrival at the appointment.\n"+"Regards,\nService Booking Ltd"
		frappe.sendmail(
			recipients=[recipient],
			subject=subject,
			message=message
		)
