import { Callback, FilterQuery, Query } from "mongoose";
import { Request } from "express";

class ApiFeature {
	modelQuery: Query<{}, any>;
	filterObject: { [key: string]: string } | Callback<any[]>;
	featureObject: { [key: string]: any };

	constructor(model_query: Query<{}, any>, request: Request) {
		this.modelQuery = model_query;
		this.featureObject = request.query;
		let { page, limit, filter, sort, search, select, ...excluded } = this.featureObject;
		this.filterObject = excluded;
	}

	// Pagination
	paginate() {
		let page: number = this.featureObject.page * 1 || 1;
		if (this.featureObject.page <= 0) page = 1;
		let skip = (page - 1) * this.featureObject.limit;
		this.modelQuery.skip(skip).limit(this.featureObject.limit);
		return this;
	}

	// Filteration
	filter() {
		let filteration = JSON.stringify(this.filterObject).replace(
			/\b(gt|gte|lt|lte)\b/g, (match: string) => `$${match}`
		);
		this.filterObject = JSON.parse(filteration);
		this.modelQuery.find(this.filterObject);
		return this;
	}

	// Searching
	search(...search: string[]) {
		if (this.featureObject.search) {
			let searchOptions: FilterQuery<any>[] | undefined = search.map(
				(option: string) => {
					return {
						[option]: { $regex: this.featureObject.search, $options: "i" },
					};
				}
			);
			this.modelQuery.find({ $or: searchOptions });
		}
		return this;
	}

	// Sorting
	sort() {
		if (this.featureObject.sort) {
			let sortBy = this.featureObject.sort.split(",").join("");
			this.modelQuery.sort(sortBy);
		}
		return this;
	}

	// Selecting fields
	select() {
		if (this.featureObject.select) {
			let fields = this.featureObject.select.split(",").join("");
			this.modelQuery.select(fields);
		}
		return this;
	}
}

export default ApiFeature;
