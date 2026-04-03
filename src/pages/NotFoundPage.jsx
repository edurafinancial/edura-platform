import { Link } from "react-router";

export default function NotFoundPage() {
	return (
		<div className="min-h-screen bg-background px-6 py-10">
			<div className="mx-auto max-w-md rounded-lg border border-border bg-card p-6 text-card-foreground">
				<h1 className="text-2xl font-semibold">Page not found</h1>
				<p className="mt-2 text-muted-foreground">
					The page you requested does not exist.
				</p>
				<Link
					to="/"
					className="mt-4 inline-flex rounded-md bg-primary px-4 py-2 text-primary-foreground"
				>
					Go home
				</Link>
			</div>
		</div>
	);
}
