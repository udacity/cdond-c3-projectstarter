import { Injectable, Type } from '@nestjs/common';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { Module } from '@nestjs/core/injector/module';
import { ModulesContainer } from '@nestjs/core/injector/modules-container';
import { COMMAND_VALIDATOR_METADATA } from '../constants';
import { ICommandValidator } from './ICommandValidator';
import { CommandValidatorOptions } from './commandValidatorOptions';

@Injectable()
export class ValidationExplorer {
  constructor(private readonly modulesContainer: ModulesContainer) {}

  explore(): CommandValidatorOptions {
    const modules = [...this.modulesContainer.values()];
    const validators = this.flatMap<ICommandValidator>(modules, instance =>
      this.filterProvider(instance, COMMAND_VALIDATOR_METADATA),
    );

    return { validators };
  }

  flatMap<T>(
    modules: Module[],
    callback: (instance: InstanceWrapper) => Type<any> | undefined,
  ): Type<T>[] {
    const items = modules
      .map(module => [...module.providers.values()].map(callback))
      .reduce((a, b) => a.concat(b), []);
    return items.filter(element => !!element) as Type<T>[];
  }

  filterProvider(
    wrapper: InstanceWrapper,
    metadataKey: string,
  ): Type<any> | undefined {
    const { instance } = wrapper;
    if (!instance) {
      return undefined;
    }
    return this.extractMetadata(instance, metadataKey);
  }

  extractMetadata(instance: Object, metadataKey: string): Type<any> {
    if (!instance.constructor) {
      return;
    }
    const metadata = Reflect.getMetadata(metadataKey, instance.constructor);
    return metadata ? (instance.constructor as Type<any>) : undefined;
  }
}
