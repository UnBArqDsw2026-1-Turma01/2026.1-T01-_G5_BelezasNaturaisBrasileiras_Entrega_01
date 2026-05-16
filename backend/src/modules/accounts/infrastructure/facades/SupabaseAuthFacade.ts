import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { IAuthFacade } from '../../domain/interfaces/IAuthFacade';

@Injectable()
export class SupabaseAuthFacade implements IAuthFacade {
  private client: SupabaseClient;

  constructor() {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_KEY;

    if (!url || !key) {
      throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_KEY');
    }

    this.client = createClient(url, key);
  }

  async registerUser(email: string, password: string): Promise<{ uid: string }> {
    const { data, error } = await this.client.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (error) {
      throw new Error(`Supabase: falha ao criar usuário — ${error.message}`);
    }

    return { uid: data.user.id };
  }

  async removeUser(uid: string): Promise<void> {
    const { error } = await this.client.auth.admin.deleteUser(uid);

    if (error) {
      throw new Error(`Supabase: falha ao remover usuário — ${error.message}`);
    }
  }
}
