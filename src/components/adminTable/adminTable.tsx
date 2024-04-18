'use client'

import React, { useMemo, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Link, Chip, DropdownTrigger, Dropdown, Button, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { checkout } from "@/types/types";
import { getDate } from "@/utiles/getDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faEye } from "@fortawesome/free-solid-svg-icons";


const columns = [
	{ key: 'name', label: 'NAME' },
	{ key: 'email', label: 'EMAIL' },
	{ key: 'phone', label: 'PHONE' },
	{ key: 'createdAt', label: 'CREATED' },
	{ key: 'delivery', label: 'DELIVERY' },
	{ key: 'status', label: 'STATUS' },
	{ key: 'actions', label: 'ACTIONS' },
]

const statusColorMap : { [key: string]: any } = {
	EXCEPTED: "primary",
	INPROGRESS: "warning",
	DELIVERED: "success",
	EXECUTED: "danger",
}

const statusOptions = [
	{ name: 'EXCEPTED', uid: "EXCEPTED" },
	{ name: 'INPROGRESS', uid: "INPROGRESS" },
	{ name: 'DELIVERED', uid: "DELIVERED" },
	{ name: 'EXECUTED', uid: "EXECUTED" },
]


const AdminTable = ({ checkout }: { checkout: checkout[] }) => {
	const [statusFilter, setStatusFilter] = useState("all")
	const [page, setPage] = useState(1)
	const rowsPerPage = 10

	const filteredItems = useMemo(() => {
		let filteredCheckout = [...checkout]

		if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
			filteredCheckout = filteredCheckout.filter((item) =>
				Array.from(statusFilter).includes(item.status)
			)
		}
		return filteredCheckout
	}, [checkout, statusFilter, page]);

	const items = React.useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;

		return filteredItems.slice(start, end);
	}, [page, filteredItems]);

	const pages = Math.ceil(filteredItems.length / rowsPerPage)

	const bottomContent = React.useMemo(() => {
		return (
			<div className="py-2 px-2 flex justify-between items-center">
				<span className="w-[30%] text-small text-default-400">
					{statusFilter === "all"
						? "All items selected"
						: `${statusFilter.length} of ${filteredItems.length} selected`}
				</span>
				<Pagination
					isCompact
					showControls
					showShadow
					color="secondary"
					page={page}
					total={pages}
					onChange={(page) => setPage(page)}
				/>
			</div>
		);
	}, [statusFilter]);

	return (
		<div>

			<Table
				aria-label="Table with client orders"
				color="secondary"
				bottomContent={bottomContent}
				classNames={{
					wrapper: "min-h-[222px]",
				}}
			>
				<TableHeader columns={columns}>
					<TableColumn>NAME</TableColumn>
					<TableColumn>EMAIL</TableColumn>
					<TableColumn>PHONE</TableColumn>
					<TableColumn>CREATED</TableColumn>
					<TableColumn>DELIVERY</TableColumn>
					<TableColumn >
						<Dropdown >
							<DropdownTrigger className="hidden sm:flex">
								<Button
									className="font-semibold text-xs"
									endContent={<FontAwesomeIcon icon={faChevronDown} />}
									variant="light">
									STATUS
								</Button>
							</DropdownTrigger>
							<DropdownMenu
								disallowEmptySelection
								aria-label="Table Columns"
								closeOnSelect={false}
								selectedKeys={statusFilter}
								selectionMode="multiple"
								onSelectionChange={setStatusFilter as any}
							>
								{statusOptions.map((status) => (
									<DropdownItem key={status.uid} className="capitalize">
										{status.name}
									</DropdownItem>
								))}
							</DropdownMenu>
						</Dropdown>
					</TableColumn>
					<TableColumn>ACTIONS</TableColumn>
				</TableHeader>
				<TableBody items={items}>
					{item => (
						<TableRow key={item.email}>
							<TableCell>{item.name}</TableCell>
							<TableCell>{item.email}</TableCell>
							<TableCell>{item.phone}</TableCell>
							<TableCell>{getDate(item.createdAt)}</TableCell>
							<TableCell>{item.deliveryDate}</TableCell>
							<TableCell>
								<Chip
									className="capitalize"
									color={statusColorMap[item.status]}
									size="sm"
									variant="flat"
								>
									{item.status}
								</Chip>
							</TableCell>
							<TableCell>
								<Link
									href={`/dashboard/${item.id}`}
									color="secondary"
								>
									<FontAwesomeIcon icon={faEye} />
								</Link>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	)
}

export default AdminTable