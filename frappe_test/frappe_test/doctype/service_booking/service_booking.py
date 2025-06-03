# Copyright (c) 2025, Tahsin Ahmed Refat and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class ServiceBooking(Document):

	def on_submit(self):
		self.send_email()
  
	def send_email(self):
		recipient = frappe.db.get_value(
			"Employee",
			self.customer,
			"user_id"
		)

		str_datetime = self.datetime.strftime("%d %B %Y")
		subject = "Service Booking Confirmation"
		message = "Hello " + self.customer_name + ",<br><br>" + \
          "Your Requested Appointment on " + str_datetime + " has been approved. We expect your timely arrival at the appointment.<br><br>" + \
          "Regards,<br>Service Booking Ltd"
		frappe.sendmail(
			recipients=[recipient],
			subject=subject,
			message=message
		)
