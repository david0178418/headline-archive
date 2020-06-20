import Head from 'next/head';
import {
	Container,
	Form,
	Col,
	Button,
	Row,
	Breadcrumb,
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import { Feed } from 'interfaces';
import { chunk } from 'helpers/utils';
import { ArticleRow } from '@components/article-row';
import { Loader } from '@components/loader';
import { useState, useEffect } from 'react';
import { format, isSameDay, endOfHour } from 'date-fns';
import Link from 'next/link';
import DayPickerInput from 'react-day-picker/DayPickerInput';

const CUTOFF = 'Wed Jun 17 2020 12:00:00 GMT-0500 (Central Daylight Time)';

interface Props {
	feeds: Feed[];
}

export
function ArticleListing({feeds}: Props) {
	const router = useRouter();
	const [timestamp, setTimestamp] = useState(getUrlParam);
	const pageDate = new Date(timestamp);
	const [date, setDate] = useState(pageDate);
	const [hour, setHour] = useState(pageDate.getHours());
	const isSame = isSameDay(pageDate, date) && (
		hour === pageDate.getHours()
	);

	useEffect(() => {
		// setTimestamp(timestamp);
	}, []);

	useEffect(() => {
			setTimestamp(getUrlParam());
	}, [router.query.datetime]);

	function getUrlParam() {
		const urlParam = router.query.datetime as string;
		return Date.parse(urlParam) ?
			urlParam :
			(endOfHour(new Date())).toISOString();
	}

	function getSelectedTimestamp() {
		const newDate = endOfHour(date);
		newDate.setHours(hour);

		return newDate.toISOString();
	}

	return (
		<div>
			<Head>
				<title>
					Headline Archive
				</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Breadcrumb>
				<Breadcrumb.Item href="/">
					Home
				</Breadcrumb.Item>
				{router.query.datetime && (
					<>
						<Breadcrumb.Item active>
							Archive
						</Breadcrumb.Item>
						<Breadcrumb.Item href={`/archive/${encodeURIComponent(timestamp)}`}>
							{format(pageDate, 'PP, haaaa')}
						</Breadcrumb.Item>
					</>
				)}
			</Breadcrumb>
			<Container>
				<h2>
					Headline Archive
				</h2>
				<Container className="mt-0 px-0">
					<Form.Row>
						<Form.Group as={Col}>
							<Form.Label>
								Date
							</Form.Label>
							<DayPickerInput
								format="LL"
								value={date}
								dayPickerProps={{
									disabledDays: { 
										before: new Date(CUTOFF), 
										after: new Date(),
									}
								}}
								onDayChange={setDate}
								formatDate={date => format(date, 'PP')}
								classNames={{
									container: 'DayPickerInput form-control',
									overlayWrapper: 'DayPickerInput-OverlayWrapper',
									overlay: 'DayPickerInput-Overlay',
								}}
							/>
						</Form.Group>
						<Form.Group as={Col}>
							<Form.Label>
								Hour
							</Form.Label>
							<Form.Control
								as="select"
								value={hour}
								onChange={e => setHour(+e.target.value)}
							>
								<option value={0}>12 am</option>
								<option value={1}>1 am</option>
								<option value={2}>2 am</option>
								<option value={3}>3 am</option>
								<option value={4}>4 am</option>
								<option value={5}>5 am</option>
								<option value={6}>6 am</option>
								<option value={7}>7 am</option>
								<option value={8}>8 am</option>
								<option value={9}>9 am</option>
								<option value={10}>10 am</option>
								<option value={11}>11 am</option>
								<option value={12}>12 pm</option>
								<option value={13}>1 pm</option>
								<option value={14}>2 pm</option>
								<option value={15}>3 pm</option>
								<option value={16}>4 pm</option>
								<option value={17}>5 pm</option>
								<option value={18}>6 pm</option>
								<option value={19}>7 pm</option>
								<option value={20}>8 pm</option>
								<option value={21}>9 pm</option>
								<option value={22}>10 pm</option>
								<option value={23}>11 pm</option>
							</Form.Control>
						</Form.Group>
					</Form.Row>
					<Row>
						<Col>
							<Link href="/archive/[datetime]" as={`/archive/${getSelectedTimestamp()}`}>
								<Button block disabled={isSame}>
									Go
								</Button>
							</Link>
						</Col>
					</Row>
					<Row>
						<Col>
							<Container fluid className="px-0">
								{chunk(feeds, 3).map((rowFeeds, i) => (
									<ArticleRow
										key={i}
										rowKey={i}
										feeds={rowFeeds}
									/>
								))}
							</Container>
						</Col>
					</Row>
				</Container>
			</Container>
			<Loader/>
		</div>
	);
}
