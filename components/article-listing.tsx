import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import clsx from 'clsx';
import {
	Container,
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

const TopWords = dynamic(() => import('../components/top-words'), {
	ssr: false
});

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
	const hour = nearestHour(pageDate.getHours());
	const isSame = isSameDay(pageDate, date);
	let {
		lean = '',
	} = router.query;

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
	}

	function getUrlParam() {
		const urlParam = router.query.datetime as string;
		return Date.parse(urlParam) ?
			urlParam :
			(endOfHour(new Date())).toISOString();
	}

	function getSelectedTimestamp(newHour: number) {
		const newDate = endOfHour(date || new Date());
		newDate.setHours(newHour);

		return newDate.toISOString();
	}

	const tabQuery: any = {};

	if(lean !== SourceLeaning.All) {
		tabQuery.lean = lean;
	}

	return (
		<div>
			<Head>
				<title>
					FullView News (beta)
				</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Container as={Breadcrumb}>
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
			</Container>
			<Container>
				<Row>
					<Col className="heading-logo-container mb-4">
						<div className="heading-logo-image-container">
							<img src="/logo-horizontal.png"/>
							<div className="beta-marker">
								<small><em>beta</em></small>
							</div>
						</div>
					</Col>
				</Row>
				<p>
					Aggregating and archiving news from both sides of the aisle.
				</p>
				<Container className="mt-0 px-0">
					<Row>
						<Col
							sm={{
								span: 4,
								offset: 3,
							}}
							lg={{
								span: 3,
								offset: 4,
							}}
						>
							<DayPickerInput
								format="LL"
								value={date}
								dayPickerProps={{
									disabledDays: {
										before: new Date(CUTOFF), 
										after: new Date(),
									},
								}}
								onDayChange={setDate}
								formatDate={date => format(date, 'PP')}
								classNames={{
									container: 'DayPickerInput form-control',
									overlayWrapper: 'DayPickerInput-OverlayWrapper',
									overlay: 'DayPickerInput-Overlay',
								}}
							/>
						</Col>
						<Col
							sm={2}
							lg={1}
						>
							<Link
								prefetch={false}
								href="/archive/[datetime]"
								as={`/archive/${encodeURIComponent(getSelectedTimestamp(hour))}`}
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
							<nav className="nav nav-tabs flex-column flex-sm-row">
								<Link
									scroll={false}
									prefetch={false}
									href={{
										pathname: "/archive/[datetime]",
										query: tabQuery,
									}}
									as={{
										pathname: `/archive/${encodeURIComponent(getSelectedTimestamp(0))}`,
										query: tabQuery,
									}}
								>
									<a className={clsx('nav-link nav-item flex-sm-fill text-sm-center', {
										active: hour === 0,
									})}>
										12 am
									</a>
								</Link>
								<Link
									scroll={false}
									prefetch={false}
									href={{
										pathname: "/archive/[datetime]",
										query: tabQuery,
									}}
									as={{
										pathname: `/archive/${encodeURIComponent(getSelectedTimestamp(4))}`,
										query: tabQuery,
									}}
								>
									<a className={clsx('nav-link nav-item flex-sm-fill text-sm-center', {
										active: hour === 4,
									})}>
										4 am
									</a>
								</Link>
								<Link
									scroll={false}
									prefetch={false}
									href={{
										pathname: "/archive/[datetime]",
										query: tabQuery,
									}}
									as={{
										pathname: `/archive/${encodeURIComponent(getSelectedTimestamp(8))}`,
										query: tabQuery,
									}}
								>
									<a className={clsx('nav-link nav-item flex-sm-fill text-sm-center', {
										active: hour === 8,
									})}>
										8 am
									</a>
								</Link>
								<Link
									scroll={false}
									prefetch={false}
									href={{
										pathname: "/archive/[datetime]",
										query: tabQuery,
									}}
									as={{
										pathname: `/archive/${encodeURIComponent(getSelectedTimestamp(12))}`,
										query: tabQuery,
									}}
								>
									<a className={clsx('nav-link nav-item flex-sm-fill text-sm-center', {
										active: hour === 12,
									})}>
										12 pm
									</a>
								</Link>
								<Link
									scroll={false}
									prefetch={false}
									href={{
										pathname: "/archive/[datetime]",
										query: tabQuery,
									}}
									as={{
										pathname: `/archive/${encodeURIComponent(getSelectedTimestamp(16))}`,
										query: tabQuery,
									}}
								>
									<a className={clsx('nav-link nav-item flex-sm-fill text-sm-center', {
										active: hour === 16,
									})}>
										4 pm
									</a>
								</Link>
								<Link
									scroll={false}
									prefetch={false}
									href={{
										pathname: "/archive/[datetime]",
										query: tabQuery,
									}}
									as={{
										pathname: `/archive/${encodeURIComponent(getSelectedTimestamp(20))}`,
										query: tabQuery,
									}}
								>
									<a className={clsx('nav-link nav-item flex-sm-fill text-sm-center', {
										active: hour === 20,
									})}>
										8 pm
									</a>
								</Link>
							</nav>
						</Col>
					</Row>

					<Row className="mt-4">
						<Col>
							<nav className="nav nav-pills flex-column flex-sm-row">
								<Link
									shallow
									scroll={false}
									prefetch={false}
									href={router.pathname}
									as={rootPath}
								>
									<a className={clsx('nav-link nav-item flex-sm-fill text-sm-center', {
										active: lean === SourceLeaning.All,
									})}>
										All ({allCount})
									</a>
								</Link>
								<Link
									shallow
									scroll={false}
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
									scroll={false}
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
									scroll={false}
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

					<TopWords feeds={selectedFeeds} />
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
