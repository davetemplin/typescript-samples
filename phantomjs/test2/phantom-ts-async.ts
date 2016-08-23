"use strict";
var phantom = require('phantom');

export async function create(options?: CreateOptions): Promise<Instance> {
	return new Promise<Instance>(promise => {
		phantom.create(options, (result: any) => promise(new Instance(result)));
	});
}

export class Instance {
	private instance: any;
	
	constructor(instance: any) {
		this.instance = instance;
	}
	
	async createPage(): Promise<WebPage> {
		return new Promise<WebPage>(promise => {
			this.instance.createPage(result => {
				promise(new WebPage(result));
			});
		});
	}
	
	exit(returnValue?: number): void {
		this.instance.exit(returnValue);
	}
}

export class WebPage {
	private instance: any;
	
	constructor(instance: any) {
		this.instance = instance;
	}
	
	async open(url: string): Promise<string> {
		return new Promise<string>(promise => {
			this.instance.open(url, result => {
				promise(<string>result);
			});
		});
	}
	
	async evaluate<T>(callback: () => void): Promise<T> {
		return new Promise<T>(promise => {
			this.instance.evaluate(callback, result => {
				promise(<T>result);
			});	
		});
		
	}
}

export interface CreateOptions {
	binary?: string;
	hostname?: string;
	path?: string;
	port?: number;
}
