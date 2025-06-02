# Copyright (c) 2025, Tahsin Ahmed Refat and contributors
# For license information, please see license.txt

import frappe
from frappe.query_builder import DocType
from pypika import Order

def execute(filters=None):
    if not filters:
        filters = {}

    # Columns
    columns = [
        {"label": "Appointment ID", "fieldname": "name", "fieldtype": "Link", "options": "Service Booking", "width": 200},
        {"label": "Customer", "fieldname": "customer", "fieldtype": "Link", "options": "Employee", "width": 200},
        {"label": "Customer Name", "fieldname": "customer_name", "fieldtype": "Data", "width": 350},
        {"label": "Service Type", "fieldname": "service_type", "fieldtype": "Data", "width": 120},
        {"label": "Status", "fieldname": "status", "fieldtype": "Data", "width": 100},
        {"label": "Date", "fieldname": "datetime", "fieldtype": "Datetime", "width": 245},
    ]

    SB = DocType("Service Booking")
    query = (
        frappe.qb.from_(SB)
        .select(
            SB.name,
            SB.customer,
            SB.customer_name,
            SB.service_type,
            SB.status,
            SB.datetime,
        )
    )

    # Dynamically apply filters based on the filters are emtpy or not
    if filters.get("from_date"):
        query = query.where(SB.datetime >= filters["from_date"])
    if filters.get("to_date"):
        query = query.where(SB.datetime <= filters["to_date"])
    if filters.get("customer"):
        query = query.where(SB.customer == filters["customer"])
    if filters.get("SERVICE_TYPE"):
        query = query.where(SB.service_type == filters["SERVICE_TYPE"])
    if filters.get("status"):
        query = query.where(SB.status == filters["status"])

    # Optional: Order by date descending
    query = query.orderby(SB.datetime, order=Order.desc)

    data = query.run(as_dict=True)

    return columns, data
