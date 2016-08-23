"use strict";
var phantom = require('phantom');

export async function create(options?: CreateOptions): Promise<Instance> {
	return new Promise<Instance>(p => 
		phantom.create(options, r => 
			p(new Instance(r))));
}

export class Instance {
	private instance: any;
	
	constructor(instance: any) {
		this.instance = instance;
	}
	
	async createPage(): Promise<WebPage> {
		return new Promise<WebPage>(p => 
			this.instance.createPage(r => 
				p(new WebPage(r))));
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
	
	async get<T>(key: string): Promise<T> {
		return new Promise<T>(p => 
			this.instance.get(key, r => 
				p(<T>r)));				
	}
	
	set(key: string, value: any): void {
		this.instance.set(key, value);
	}
		
	async evaluate<T>(callback: () => void): Promise<T> {
		return new Promise<T>(p => 
			this.instance.evaluate(callback, r => 
				p(<T>r)));		
	}
	
	async includeJs(url: string): Promise<void> {
		return new Promise<void>(p => {
			this.instance.includeJs(url, () => 
				p());	
		});		
	}
	
	async open(url: string): Promise<string> {
		return new Promise<string>(p => 
			this.instance.open(url, r => 
				p(<string>r)));
	}
	
	render(filename: string, options?: RenderOptions): void {
		this.instance.render(filename, options ? { format: options.format ? ImageFormat[options.format] : undefined, quality: options.quality } : undefined);
	}
}

export interface CreateOptions {
	binary?: string;
	hostname?: string;
	path?: string;
	port?: number;
}

export enum ImageFormat {
	png, jpeg, gif, pdf
}

export interface RenderOptions {
	format?: ImageFormat;
	quality?: number;
}