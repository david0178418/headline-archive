import Head from 'next/head';
import Link from 'next/link';
import clsx from 'clsx';
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
import DayPickerInput from 'react-day-picker/DayPickerInput';

const CUTOFF = 'Wed Jun 17 2020 12:00:00 GMT-0500 (Central Daylight Time)';

enum SourceLeaning {
	All = 'all',
	Left = 'left',
	Center = 'center',
	Right = 'right',
}

function nearestHour(h: number) {
	return h - h % 4;
}

interface Props {
	feeds: Feed[];
}

export
function ArticleListing({feeds}: Props) {
	const router = useRouter();
	const [timestamp, setTimestamp] = useState(getUrlParam);
	const pageDate = new Date(timestamp);
	const [date, setDate] = useState(pageDate);
	const [hour, setHour] = useState(() => nearestHour(pageDate.getHours()));
	const isSame = isSameDay(pageDate, date) && (
		hour === nearestHour(pageDate.getHours())
	);
	let {
		lean = '',
	} = router.query;;

	lean = (
		Object.values(SourceLeaning).includes(lean as SourceLeaning) ?
			lean :
			SourceLeaning.All
		) as string;

	const selectedFeeds = feeds
		.filter(f => (
			lean === SourceLeaning.All ||
			lean === f.bias
		));
	const allCount = feeds.length;
	const leftCount = feeds.filter(f => f.bias === 'left').length;
	const centerCount = feeds.filter(f => f.bias === 'center').length;
	const rightCount = feeds.filter(f => f.bias === 'right').length;
	const rootPath = router.asPath.split('?')[0];

	useEffect(() => {
		resetPage();
	}, [router.query.datetime]);

	function resetPage() {
		const newTimestamp = getUrlParam();
		setTimestamp(newTimestamp);
		const newPageDate = new Date(newTimestamp);
		setDate(newPageDate);
		setHour(nearestHour(newPageDate.getHours()));
	}

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
							{format(pageDate, 'PP, h aaaa')}
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
								<option value={12}>12 am</option>
								<option value={4}>4 am</option>
								<option value={8}>8 am</option>
								<option value={12}>12 pm</option>
								<option value={16}>4 pm</option>
								<option value={20}>8 pm</option>
							</Form.Control>
						</Form.Group>
					</Form.Row>
					<Row>
						<Col>
							<Link
								prefetch={false}
								href="/archive/[datetime]"
								as={`/archive/${encodeURIComponent(getSelectedTimestamp())}`}
							>
								<Button
									block
									variant="secondary"
									disabled={isSame}
								>
									Go
								</Button>
							</Link>
						</Col>
					</Row>

					<Row className="mt-4">
						<Col>
							<nav className="nav nav-pills flex-column flex-sm-row">
									<Link
										shallow
										prefetch={false}
										href={router.pathname}
										as={rootPath}
									>
										<a className={clsx('nav-link nav-item flex-sm-fill text-sm-center', {
											active: lean === SourceLeaning.All,
										})}>
											All Sources ({allCount})
										</a>
									</Link>
									<Link
										shallow
										prefetch={false}
										href={{
											pathname: router.pathname,
											query: {
												lean: SourceLeaning.Left,
											}
										}}
										as={{
											pathname: rootPath,
											query: {
												lean: SourceLeaning.Left,
											}
										}}
									>
										<a className={clsx('nav-link nav-item flex-sm-fill text-sm-center', {
											active: lean === SourceLeaning.Left,
										})}>
											Left Leaning Sources ({leftCount})
										</a>
									</Link>
									<Link
										shallow
										prefetch={false}
										href={{
											pathname: router.pathname,
											query: {
												lean: SourceLeaning.Center,
											}
										}}
										as={{
											pathname: rootPath,
											query: {
												lean: SourceLeaning.Center,
											}
										}}
									>
										<a className={clsx('nav-link nav-item flex-sm-fill text-sm-center', {
											active: lean === SourceLeaning.Center,
										})}>
											Center Sources ({centerCount})
										</a>
									</Link>
									<Link
										shallow
										prefetch={false}
										href={{
											pathname: router.pathname,
											query: {
												lean: SourceLeaning.Right,
											}
										}}
										as={{
											pathname: rootPath,
											query: {
												lean: SourceLeaning.Right,
											}
										}}
									>
										<a className={clsx('nav-link nav-item flex-sm-fill text-sm-center', {
											active: lean === SourceLeaning.Right,
										})}>
											Right Leaning Sources ({rightCount})
										</a>
									</Link>
							</nav>
						</Col>
					</Row>
					<Row className="px-0">
						{chunk(selectedFeeds, 3).map((rowFeeds, i) => (
							<ArticleRow
								key={i}
								rowKey={i}
								feeds={rowFeeds}
							/>
						))}
					</Row>
				</Container>
			</Container>
			<Loader/>
		</div>
	);
}
