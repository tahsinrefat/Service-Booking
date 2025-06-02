# Copyright (c) 2025, Tahsin Ahmed Refat and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class ServiceBooking(Document):
	def validate(self):
		# self.send_email()
		pass
  
	def send_email(self):
		recipient = frappe.db.get_value(
			"Employee",
			self.customer,
			"user_id"
		)
  
		subject = "Test for Service Booking"
		message = "Hello "+self.customer_name+",\nThis is a test email for service booking."
		frappe.sendmail(
			recipients=[recipient],
			subject=subject,
			message=message
		)
