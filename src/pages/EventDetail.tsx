import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import { getEventDetailById } from '../data/eventDetails';
import './EventDetail.css';

const EventDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const item = getEventDetailById(id);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [id]);

	const handleBack = () => {
		if (window.history.length > 1) {
			navigate(-1);
		} else {
			navigate('/events');
		}
	};

	if (!item) {
		return (
			<div className="detail-container">
				<Navbar />
				<div className="content-container">
					<div className="content-wrapper event-content-wrapper">
						<h1 className="title1 event-detail-title">Event not found</h1>
						<button className="back-button" onClick={handleBack}>
							← Back to Events
						</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="detail-container">
			<Navbar />

			<div className="hero-image-container">
				<img className="hero-image" src={item.coverImage} alt={item.title} />
			</div>

			<div className="content-container">
				<div className="content-wrapper event-content-wrapper">
					<h1 className="title1 event-detail-title">{item.title}</h1>
					<p className="authors event-detail-subtitle">{item.subtitle}</p>

					<div className="event-detail-meta-list">
						{item.meta.map((metaItem) => {
							const values = Array.isArray(metaItem.value) ? metaItem.value : [metaItem.value];

							return (
								<div key={metaItem.label} className="event-detail-meta-item">
									<div className="event-detail-meta-label">{metaItem.label}</div>
									<div className="event-detail-meta-value">
										{values.map((value) => (
											<div key={`${metaItem.label}-${value}`}>{value}</div>
										))}
									</div>
								</div>
							);
						})}
					</div>

					<Section title="Description" content={item.description} />
					<Section title="Highlights" content={item.highlights} />
					<Section title="Impact" content={item.impact} />

					<div className="detail-image-container">
						{item.sectionImages.map((image, index) => (
							<img
								key={`${image.src}-${index}`}
								src={image.src}
								alt={image.alt}
								className={`detail-image ${index === 0 ? 'full-width' : 'half-width'}`}
							/>
						))}
					</div>

					<button className="back-button" onClick={handleBack}>
						← Back to Events
					</button>
				</div>
			</div>
		</div>
	);
};

const Section: React.FC<{ title: string; content: string[] }> = ({ title, content }) => {
	if (!content?.length) {
		return null;
	}

	return (
		<section className="section">
			<h2 className="section-title event-section-title">{title}</h2>
			{content.map((paragraph, index) => (
				<p key={`${title}-${index}`} className="content-paragraph">
					{paragraph}
				</p>
			))}
		</section>
	);
};

export default EventDetail;
